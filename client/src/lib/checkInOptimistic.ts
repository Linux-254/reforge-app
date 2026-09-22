import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "../../../server/routers";

export type TodayCheckIns = inferRouterOutputs<AppRouter>["checkIn"]["getToday"];
export type CreateCheckInInput = inferRouterInputs<AppRouter>["checkIn"]["create"];

export function optimisticTodayCheckIns(
  previous: TodayCheckIns | undefined,
  input: CreateCheckInInput,
  userId: number,
  now = new Date(),
): TodayCheckIns {
  const current = previous ?? { morning: undefined, evening: undefined };
  const existing = input.part === "morning" ? current.morning : current.evening;
  const entry = existing ?? {
    id: -now.getTime(),
    userId,
    localDate: now.toISOString().split("T")[0],
    part: input.part,
    mood: null,
    energy: null,
    cravings: null,
    payload: null,
    createdAt: now,
    updatedAt: null,
  };
  const nextEntry = {
    ...entry,
    mood: input.mood ?? null,
    energy: input.energy ?? null,
    cravings: input.cravings ?? null,
    payload: input.notes ? { notes: input.notes } : null,
  };

  return input.part === "morning"
    ? { ...current, morning: nextEntry }
    : { ...current, evening: nextEntry };
}
