import { eq, asc } from "drizzle-orm";
import { lifeDimensions, InsertLifeDimension, LifeDimension } from "../../drizzle/schema";
import { getDb } from "./client";

const DEFAULT_DIMENSIONS: LifeDimension[] = [
  { id: 1, slug: "work-career", label: "Work & Career", description: null, order: 1, createdAt: new Date(0) },
  { id: 2, slug: "aspirations-goals", label: "Aspirations & Goals", description: null, order: 2, createdAt: new Date(0) },
  { id: 3, slug: "impact-loved-ones", label: "Impact on Loved Ones", description: null, order: 3, createdAt: new Date(0) },
  { id: 4, slug: "behavioral-changes", label: "Behavioural Changes", description: null, order: 4, createdAt: new Date(0) },
  { id: 5, slug: "who-before", label: "Who They Were Before", description: null, order: 5, createdAt: new Date(0) },
  { id: 6, slug: "escaping-from", label: "What They Were Escaping", description: null, order: 6, createdAt: new Date(0) },
  { id: 7, slug: "getting-back-to", label: "What They Were Trying to Get Back To", description: null, order: 7, createdAt: new Date(0) },
  { id: 8, slug: "when-using", label: "What They Were Like When Using", description: null, order: 8, createdAt: new Date(0) },
  { id: 9, slug: "short-term-changes", label: "Short-Term Changes", description: null, order: 9, createdAt: new Date(0) },
  { id: 10, slug: "long-term-changes", label: "Long-Term Changes", description: null, order: 10, createdAt: new Date(0) },
  { id: 11, slug: "going-for", label: "What They Were Going For", description: null, order: 11, createdAt: new Date(0) },
  { id: 12, slug: "faith-relationship", label: "Relationship with God/Faith", description: null, order: 12, createdAt: new Date(0) },
  { id: 13, slug: "relationships", label: "Relationship with Others", description: null, order: 13, createdAt: new Date(0) },
  { id: 14, slug: "avoiding", label: "What They Were Avoiding", description: null, order: 14, createdAt: new Date(0) },
  { id: 15, slug: "not-avoiding", label: "What They Were NOT Avoiding", description: null, order: 15, createdAt: new Date(0) },
  { id: 16, slug: "physical-health", label: "Physical Health", description: null, order: 16, createdAt: new Date(0) },
  { id: 17, slug: "mental-health", label: "Mental Health", description: null, order: 17, createdAt: new Date(0) },
  { id: 18, slug: "financial", label: "Financial Situation", description: null, order: 18, createdAt: new Date(0) },
  { id: 19, slug: "daily-routines", label: "Daily Routines", description: null, order: 19, createdAt: new Date(0) },
  { id: 20, slug: "social-environment", label: "Social Environment", description: null, order: 20, createdAt: new Date(0) },
  { id: 21, slug: "self-image", label: "Self-Image", description: null, order: 21, createdAt: new Date(0) },
];

export async function getLifeDimensions() {
  const db = await getDb();
  if (!db) return DEFAULT_DIMENSIONS;

  const rows = await db.select().from(lifeDimensions).orderBy(asc(lifeDimensions.order));
  return rows.length > 0 ? rows : DEFAULT_DIMENSIONS;
}

export async function seedLifeDimensions() {
  const db = await getDb();
  if (!db) return;

  const dimensionData: InsertLifeDimension[] = [
    { slug: "work-career", label: "Work & Career", order: 1 },
    { slug: "aspirations-goals", label: "Aspirations & Goals", order: 2 },
    { slug: "impact-loved-ones", label: "Impact on Loved Ones", order: 3 },
    { slug: "behavioral-changes", label: "Behavioural Changes", order: 4 },
    { slug: "who-before", label: "Who They Were Before", order: 5 },
    { slug: "escaping-from", label: "What They Were Escaping", order: 6 },
    {
      slug: "getting-back-to",
      label: "What They Were Trying to Get Back To",
      order: 7,
    },
    { slug: "when-using", label: "What They Were Like When Using", order: 8 },
    { slug: "short-term-changes", label: "Short-Term Changes", order: 9 },
    { slug: "long-term-changes", label: "Long-Term Changes", order: 10 },
    { slug: "going-for", label: "What They Were Going For", order: 11 },
    {
      slug: "faith-relationship",
      label: "Relationship with God/Faith",
      order: 12,
    },
    { slug: "relationships", label: "Relationship with Others", order: 13 },
    { slug: "avoiding", label: "What They Were Avoiding", order: 14 },
    { slug: "not-avoiding", label: "What They Were NOT Avoiding", order: 15 },
    { slug: "physical-health", label: "Physical Health", order: 16 },
    { slug: "mental-health", label: "Mental Health", order: 17 },
    { slug: "financial", label: "Financial Situation", order: 18 },
    { slug: "daily-routines", label: "Daily Routines", order: 19 },
    { slug: "social-environment", label: "Social Environment", order: 20 },
    { slug: "self-image", label: "Self-Image", order: 21 },
  ];

  for (const dim of dimensionData) {
    const existing = await db
      .select()
      .from(lifeDimensions)
      .where(eq(lifeDimensions.slug, dim.slug))
      .limit(1);

    if (existing.length === 0) {
      await db.insert(lifeDimensions).values(dim);
    }
  }
}
