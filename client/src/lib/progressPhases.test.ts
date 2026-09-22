import { describe, expect, it } from "vitest";
import { phaseForScore, recoveryPhases } from "./progressPhases";

describe("progress phase policy", () => {
  it("maps each score band to the intended recovery phase", () => {
    expect(recoveryPhases[phaseForScore(0)].label).toBe("Stabilize");
    expect(recoveryPhases[phaseForScore(24)].label).toBe("Stabilize");
    expect(recoveryPhases[phaseForScore(25)].label).toBe("Restore");
    expect(recoveryPhases[phaseForScore(50)].label).toBe("Build");
    expect(recoveryPhases[phaseForScore(75)].label).toBe("Contribute");
    expect(recoveryPhases[phaseForScore(100)].label).toBe("Contribute");
  });

  it("clamps unexpected scores to the available phase range", () => {
    expect(phaseForScore(-1)).toBe(0);
    expect(phaseForScore(101)).toBe(recoveryPhases.length - 1);
  });
});
