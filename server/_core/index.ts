import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { createServer } from "http";
import net from "net";
import path from "path";
import fs from "fs";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { registerStorageProxy } from "./storageProxy";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { ENV } from "./env";

const corsOrigins = (ENV.corsOrigins || "")
  .split(",")
  .map(origin => origin.trim())
  .filter(Boolean);

const globalApiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: { json: { message: "Too many requests, please slow down." } },
  },
});

const authLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: { json: { message: "Too many auth attempts, please wait." } },
  },
});

export function isSameOriginMetadata(req: express.Request) {
  const forwardedHost = req.get("x-forwarded-host");
  const host = req.get("host");
  const validHosts = [forwardedHost, host].filter(Boolean) as string[];
  if (validHosts.length === 0) return false;

  const origin = req.get("origin");
  const referer = req.get("referer");
  const candidate = origin || referer;
  if (!candidate) return false;

  try {
    const candidateHost = new URL(candidate).host;
    return validHosts.some(h => {
      const bareHost = h.split(":")[0];
      const bareCandidate = candidateHost.split(":")[0];
      return h === candidateHost || bareHost === bareCandidate;
    });
  } catch {
    return false;
  }
}

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, "0.0.0.0", () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.set("trust proxy", 1);

  app.use(
    helmet({
      contentSecurityPolicy: false,
      frameguard: false,
      crossOriginEmbedderPolicy: false,
      crossOriginOpenerPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
  app.use(
    cors({
      // Never reflect arbitrary origins when no explicit allowlist is configured.
      origin: corsOrigins.length > 0 ? corsOrigins : false,
      credentials: true,
    })
  );

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use("/api/oauth", authLimiter);
  app.use("/api", globalApiLimiter);

  registerStorageProxy(app);
  registerOAuthRoutes(app);

  // CSRF defense-in-depth for browser mutations. OAuth callbacks are GET requests
  // and remain outside this guard; API clients must use the configured same origin.
  app.use("/api/trpc", (req, res, next) => {
    if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method) && !isSameOriginMetadata(req)) {
      res.status(403).json({ error: "Same-origin mutation required." });
      return;
    }
    next();
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}/`);
  });
}

if (process.env.NODE_ENV !== "test" && !process.env.VITEST) {
  startServer().catch(console.error);
}
