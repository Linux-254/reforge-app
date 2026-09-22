// Standalone demo configuration — no `.env` file is required by the app.
// These are safe built-in defaults so the demo boots with zero config.
// (`isProduction` follows NODE_ENV set by the start script, not a dotfile.)
export const ENV = {
  appId: "reforge-demo",
  cookieSecret: "reforge-demo-local-secret-0123456789",
  encryptionKey: "",
  databaseUrl: "",
  oAuthServerUrl: "",
  ownerOpenId: "",
  corsOrigins: "",
  securityHeaders: false,
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: "",
  forgeApiKey: "",
  supabaseUrl: "",
  supabasePublishableKey: "",
  supabaseJwksUrl: "",
  supabaseAuthEnabled: false,
};