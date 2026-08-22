import type { RawNLUResult, RawEntity } from "./types.ts";
import type {
  SearchRequest,
  ActivityType,
  NaturalEvent,
  EnvironmentAttribute,
} from "../types/search-request.ts";
import { SearchRequestSchema } from "../schemas/search-request.schema.ts";

export class SearchInterpreter {
  public interpret(nluResult: RawNLUResult): SearchRequest {
    const activities: ActivityType[] = [];
    let naturalEvent: NaturalEvent | undefined = undefined;
    const preferred: EnvironmentAttribute[] = [];
    const avoided: EnvironmentAttribute[] = [];

    let originQueryText: string | undefined = undefined;
    let maxDurationMinutes: number | undefined = undefined;
    let maxDistanceKm: number | undefined = undefined;
    let relativeTime:
      | "tonight"
      | "tomorrow_morning"
      | "this_weekend"
      | "custom"
      | undefined = undefined;

    for (const entity of nluResult.entities) {
      this.extractActivityOrEvent(entity, activities, (event) => {
        naturalEvent = event;
      });
      this.extractPreferences(entity, nluResult.text, preferred, avoided);

      const location = this.extractLocation(entity);
      if (location) originQueryText = location;

      const duration = this.extractDuration(entity);
      if (duration !== undefined) maxDurationMinutes = duration;

      const distance = this.extractDistance(entity);
      if (distance !== undefined) maxDistanceKm = distance;

      const time = this.extractTime(entity);
      if (time) relativeTime = time;
    }

    const unvalidatedRequest: SearchRequest = {
      origin: {
        queryText: originQueryText,
      },
      activities,
      travel: {
        maxDurationMinutes,
        maxDistanceKm,
      },
      preferences: {
        preferred,
        avoided,
      },
      time: {
        relative: relativeTime,
        naturalEvent,
      },
      weather: {},
    };

    return SearchRequestSchema.parse(unvalidatedRequest);
  }

  private extractActivityOrEvent(
    e: RawEntity,
    activities: ActivityType[],
    setNaturalEvent: (event: NaturalEvent) => void
  ): void {
    const val = (e.option || e.entity || e.utteranceText || "").toLowerCase();

    if (val === "sunset" || val === "sunrise") {
      setNaturalEvent(val as NaturalEvent);
      return;
    }

    const validActivities: ActivityType[] = [
      "stargazing",
      "hiking",
      "photography",
      "picnic",
    ];

    if (validActivities.includes(val as ActivityType)) {
      if (!activities.includes(val as ActivityType)) {
        activities.push(val as ActivityType);
      }
    }
  }

  private extractPreferences(
    e: RawEntity,
    fullText: string,
    preferred: EnvironmentAttribute[],
    avoided: EnvironmentAttribute[]
  ): void {
    const val = (e.option || e.entity || e.utteranceText || "").toLowerCase();
    const validAttributes: EnvironmentAttribute[] = [
      "quiet",
      "scenic",
      "remote",
      "uncrowded",
    ];

    if (!validAttributes.includes(val as EnvironmentAttribute)) return;

    const attr = val as EnvironmentAttribute;
    const lowerText = fullText.toLowerCase();
    const entityText = (e.sourceText || e.utteranceText || val).toLowerCase();
    const entityIndex = lowerText.indexOf(entityText);

    let isNegated = false;
    if (entityIndex !== -1) {
      const precedingText = lowerText.substring(
        Math.max(0, entityIndex - 20),
        entityIndex
      );
      if (/\b(not|no|avoid|dont|don't|away from|without)\b/.test(precedingText)) {
        isNegated = true;
      }
    }

    if (isNegated) {
      if (!avoided.includes(attr)) avoided.push(attr);
    } else {
      if (!preferred.includes(attr)) preferred.push(attr);
    }
  }

  private extractLocation(e: RawEntity): string | undefined {
    if (
      e.entity === "location" ||
      e.entity === "gpe" ||
      e.entity === "city"
    ) {
      return e.sourceText || e.utteranceText;
    }
    return undefined;
  }

  private extractDuration(e: RawEntity): number | undefined {
    if (e.entity === "duration") {
      if (e.resolution?.values?.[0]?.value) {
        const seconds = parseInt(e.resolution.values[0].value, 10);
        if (!isNaN(seconds)) return Math.round(seconds / 60);
      }

      const text = e.sourceText || e.utteranceText || "";
      const match = text.match(/(\d+)\s*(hour|hr|minute|min)/i);
      if (match) {
        const amount = parseInt(match[1], 10);
        const unit = match[2].toLowerCase();
        return unit.startsWith("hour") || unit.startsWith("hr")
          ? amount * 60
          : amount;
      }
    }
    return undefined;
  }

  private extractDistance(e: RawEntity): number | undefined {
    if (e.entity === "dimension" || e.entity === "distance") {
      const text = e.sourceText || e.utteranceText || "";
      const isMiles = /\b(mi|mile|miles)\b/i.test(text);

      if (e.resolution?.value) {
        const val = parseFloat(e.resolution.value);
        if (!isNaN(val)) {
          return isMiles ? Math.round(val * 1.60934) : Math.round(val);
        }
      }

      const match = text.match(/(\d+(?:\.\d+)?)\s*(km|kilometer|mile|mi)/i);
      if (match) {
        const amount = parseFloat(match[1]);
        const unit = match[2].toLowerCase();
        return unit.startsWith("mi")
          ? Math.round(amount * 1.60934)
          : Math.round(amount);
      }
    }
    return undefined;
  }

  private extractTime(
    e: RawEntity
  ): "tonight" | "tomorrow_morning" | "this_weekend" | "custom" | undefined {
    if (
      e.entity === "datetimerange" ||
      e.entity === "date" ||
      e.entity === "time"
    ) {
      const text = (e.sourceText || e.utteranceText || "").toLowerCase();
      if (text.includes("tonight")) return "tonight";
      if (text.includes("tomorrow morning")) return "tomorrow_morning";
      if (text.includes("weekend")) return "this_weekend";
      return "custom";
    }
    return undefined;
  }
}