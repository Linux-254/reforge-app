export type RecoveryPhase = {
  label: string;
  range: string;
  description: string;
};

export const recoveryPhases: RecoveryPhase[] = [
  { label: "Stabilize", range: "0–24", description: "Create enough steadiness to notice what you need." },
  { label: "Restore", range: "25–49", description: "Reconnect with the people, routines, and places that support you." },
  { label: "Build", range: "50–74", description: "Turn small choices into structures you can trust." },
  { label: "Contribute", range: "75–100", description: "Let a steadier life make room for purpose and generosity." },
];

export function phaseForScore(score: number) {
  return Math.min(recoveryPhases.length - 1, Math.floor(Math.max(0, score) / 25));
}
