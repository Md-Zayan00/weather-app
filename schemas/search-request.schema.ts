import { z } from "zod";

export const ActivityTypeSchema = z.enum([
  "stargazing",
  "hiking",
  "photography",
  "picnic",
]);

export const NaturalEventSchema = z.enum(["sunrise", "sunset"]);

export const EnvironmentAttributeSchema = z.enum([
  "quiet",
  "scenic",
  "remote",
  "uncrowded",
]);

export const GeoOriginSchema = z.object({
  queryText: z.string().optional(),
  coordinates: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    })
    .optional(),
});

export const TravelConstraintsSchema = z.object({
  maxDurationMinutes: z.number().positive().optional(),
  maxDistanceKm: z.number().positive().optional(),
  mode: z.enum(["drive", "transit", "walk"]).optional(),
});

export const EnvironmentPreferencesSchema = z.object({
  preferred: z.array(EnvironmentAttributeSchema),
  avoided: z.array(EnvironmentAttributeSchema),
});

export const TimeWindowSchema = z.object({
  relative: z
    .enum(["tonight", "tomorrow_morning", "this_weekend", "custom"])
    .optional(),
  naturalEvent: NaturalEventSchema.optional(),
  startIso: z.string().datetime().optional(),
  endIso: z.string().datetime().optional(),
});

export const WeatherConstraintsSchema = z.object({
  maxRainProbability: z.number().min(0).max(100).optional(),
});

export const SearchRequestSchema = z.object({
  origin: GeoOriginSchema,
  activities: z.array(ActivityTypeSchema),
  travel: TravelConstraintsSchema,
  preferences: EnvironmentPreferencesSchema,
  time: TimeWindowSchema,
  weather: WeatherConstraintsSchema,
});