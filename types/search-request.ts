// types/search-request.ts

export type ActivityType = "stargazing" | "hiking" | "photography" | "picnic";

export type NaturalEvent = "sunrise" | "sunset";

export type EnvironmentAttribute = "quiet" | "scenic" | "remote" | "uncrowded";

export interface GeoOrigin {
  queryText?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface TravelConstraints {
  maxDurationMinutes?: number;
  maxDistanceKm?: number;
  mode?: "drive" | "transit" | "walk";
}

export interface EnvironmentPreferences {
  preferred: EnvironmentAttribute[];
  avoided: EnvironmentAttribute[];
}

export interface TimeWindow {
  relative?: "tonight" | "tomorrow_morning" | "this_weekend" | "custom";
  naturalEvent?: NaturalEvent;
  startIso?: string;
  endIso?: string;
}

export interface WeatherConstraints {
  maxRainProbability?: number;
}

export interface SearchRequest {
  origin: GeoOrigin;
  activities: ActivityType[];
  travel: TravelConstraints;
  preferences: EnvironmentPreferences;
  time: TimeWindow;
  weather: WeatherConstraints;
}