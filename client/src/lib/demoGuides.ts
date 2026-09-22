export type DemoGuideType =
  | "activity_guide"
  | "situation_guide"
  | "relationship_guide"
  | "devotional"
  | "article";

export type DemoGuide = {
  id: string;
  type: DemoGuideType;
  title: string;
  summary: string;
  body: string;
  dimension: string;
  tags: string[];
  duration: string;
  faithVariant: "faith" | "secular";
};

export const DEMO_GUIDES: DemoGuide[] = [
  {
    id: "activity-two-minute-reset",
    type: "activity_guide",
    title: "The two-minute reset",
    summary: "A small grounding practice for the space between an urge and your next choice.",
    body: "Put both feet on the ground. Name five things you can see, take four slower breaths, then choose one useful action that takes less than five minutes. The goal is not to win the whole day at once; it is to create a little room for the next honest decision.",
    dimension: "Daily practice",
    tags: ["energy:low", "time:2 min", "grounding"],
    duration: "2 min",
    faithVariant: "secular",
  },
  {
    id: "activity-walk-and-notice",
    type: "activity_guide",
    title: "Walk and notice",
    summary: "Move your body gently while bringing attention back to the world around you.",
    body: "Take a ten-minute walk without trying to solve anything. Notice three colours, two sounds, and one physical sensation. End by writing one sentence about what felt different when you returned.",
    dimension: "Body & health",
    tags: ["energy:medium", "time:10 min", "movement"],
    duration: "10 min",
    faithVariant: "secular",
  },
  {
    id: "situation-evening-urge",
    type: "situation_guide",
    title: "When the evening feels loud",
    summary: "A simple sequence for the hour when old patterns used to become automatic.",
    body: "Change the setting before negotiating with the urge. Drink water, move to a brighter room, message a safe person, and delay the decision for ten minutes. If the urge remains strong, repeat the sequence and ask for immediate support rather than handling it alone.",
    dimension: "Emotional steadiness",
    tags: ["trigger:evening", "support", "delay"],
    duration: "10 min",
    faithVariant: "secular",
  },
  {
    id: "relationship-repair-first-step",
    type: "relationship_guide",
    title: "The first repair conversation",
    summary: "Prepare to acknowledge impact without demanding instant trust in return.",
    body: "Write down what you want to take responsibility for, what you are changing, and what you are not asking the other person to do. Keep the first conversation short. Listen for the impact, avoid defending intent, and let consistent actions carry the next part.",
    dimension: "Relationships",
    tags: ["repair", "listening", "boundaries"],
    duration: "15 min",
    faithVariant: "secular",
  },
  {
    id: "devotional-small-faithful-step",
    type: "devotional",
    title: "A small faithful step",
    summary: "A quiet reflection for choosing steadiness over perfection.",
    body: "You do not have to carry the whole road in one moment. Ask what a faithful, kind, and honest next step looks like today. Let that step be enough for now, and return to it when the day becomes noisy.",
    dimension: "Meaning & faith",
    tags: ["reflection", "faith", "hope"],
    duration: "5 min",
    faithVariant: "faith",
  },
  {
    id: "article-rebuilding-rhythm",
    type: "article",
    title: "Why rhythm beats intensity",
    summary: "A practical note on building recovery around repeatable actions rather than dramatic promises.",
    body: "Change becomes more durable when the next action is visible, small, and repeatable. A morning check-in, one honest note, and one supportive conversation can become a rhythm that carries you through days when motivation is low.",
    dimension: "Work & purpose",
    tags: ["rhythm", "consistency", "habits"],
    duration: "4 min",
    faithVariant: "secular",
  },
];

export function filterDemoGuides(
  guides: DemoGuide[],
  query: string,
  dimension: string
): DemoGuide[] {
  const normalizedQuery = query.trim().toLowerCase();
  const normalizedDimension = dimension.trim().toLowerCase();

  return guides.filter(guide => {
    const matchesDimension =
      !normalizedDimension || guide.dimension.toLowerCase() === normalizedDimension;
    const haystack = [
      guide.title,
      guide.summary,
      guide.body,
      guide.dimension,
      guide.tags.join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return matchesDimension && (!normalizedQuery || haystack.includes(normalizedQuery));
  });
}

export function guideTypeLabel(type: DemoGuideType): string {
  return {
    activity_guide: "Activity guide",
    situation_guide: "Situation guide",
    relationship_guide: "Relationship guide",
    devotional: "Devotional",
    article: "Article",
  }[type];
}
