import { describe, expect, it } from "vitest";
import { DEMO_GUIDES, filterDemoGuides, guideTypeLabel } from "./demoGuides";

describe("demo guide library", () => {
  it("contains the supported guide content types", () => {
    expect(new Set(DEMO_GUIDES.map(guide => guide.type))).toEqual(
      new Set(["activity_guide", "situation_guide", "relationship_guide", "devotional", "article"])
    );
  });

  it("filters by dimension and keyword without changing detail metadata", () => {
    const results = filterDemoGuides(DEMO_GUIDES, "repair", "Relationships");
    expect(results).toHaveLength(1);
    expect(results[0]).toMatchObject({
      id: "relationship-repair-first-step",
      dimension: "Relationships",
      duration: "15 min",
    });
    expect(results[0].body).toContain("responsibility");
  });

  it("returns all content for blank filters and no content for unknown dimensions", () => {
    expect(filterDemoGuides(DEMO_GUIDES, "", "")).toHaveLength(DEMO_GUIDES.length);
    expect(filterDemoGuides(DEMO_GUIDES, "", "Unknown dimension")).toHaveLength(0);
  });

  it("provides stable labels for the detail view", () => {
    expect(guideTypeLabel("situation_guide")).toBe("Situation guide");
    expect(guideTypeLabel("devotional")).toBe("Devotional");
  });
});
