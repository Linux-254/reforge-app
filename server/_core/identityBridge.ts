import type { User } from "../../drizzle/schema";

export type IdentityBridgeDecision =
  | { kind: "use-existing"; user: User }
  | { kind: "bridge"; user: User }
  | { kind: "reject"; reason: "unverified-email" | "identity-collision" }
  | { kind: "create" };

export function decideSupabaseIdentityBridge(input: {
  mappedUser?: User;
  existingByEmail?: User;
  emailVerified: boolean;
}): IdentityBridgeDecision {
  if (input.mappedUser) return { kind: "use-existing", user: input.mappedUser };
  if (!input.existingByEmail) return { kind: "create" };
  if (!input.emailVerified) return { kind: "reject", reason: "unverified-email" };
  return { kind: "bridge", user: input.existingByEmail };
}
