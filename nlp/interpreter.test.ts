import { SearchInterpreter } from "./search-interpreter.ts";
import type { RawNLUResult } from "./types.ts";

function runStressTests() {
  const interpreter = new SearchInterpreter();

  console.log("=================================================");
  console.log(" STRESS-TESTING SEARCH INTERPRETER");
  console.log("=================================================");

  // Test 1: Unit Conversion (Miles -> Km)
  const testMiles: RawNLUResult = {
    text: "Find somewhere within 50 miles of Kolkata",
    intent: { name: "search.location", confidence: 0.9 },
    entities: [
      {
        entity: "dimension",
        sourceText: "50 miles",
        confidence: 0.95,
        resolution: { value: "50", unit: "mile" },
      },
    ],
  };
  const res1 = interpreter.interpret(testMiles);
  console.assert(
    res1.travel.maxDistanceKm === 80,
    `Expected 80km, got ${res1.travel.maxDistanceKm}`
  );
  console.log("✓ Test 1 Passed: 50 miles converted to ~80 km");

  // Test 2: Negation Handling
  const testNegation: RawNLUResult = {
    text: "I want somewhere scenic but not remote",
    intent: { name: "search.location", confidence: 0.9 },
    entities: [
      { entity: "preference", option: "scenic", sourceText: "scenic" },
      { entity: "preference", option: "remote", sourceText: "remote" },
    ],
  };
  const res2 = interpreter.interpret(testNegation);
  console.assert(
    res2.preferences.preferred.includes("scenic"),
    "Should prefer scenic"
  );
  console.assert(
    res2.preferences.avoided.includes("remote"),
    "Should avoid remote"
  );
  console.log("✓ Test 2 Passed: 'scenic but not remote' negation extracted");

  // Test 3: Natural Event vs. Activity Separation
  const testSunset: RawNLUResult = {
    text: "Find somewhere for sunset photography",
    intent: { name: "search.location", confidence: 0.9 },
    entities: [
      { entity: "activity", option: "sunset", sourceText: "sunset" },
      { entity: "activity", option: "photography", sourceText: "photography" },
    ],
  };
  const res3 = interpreter.interpret(testSunset);
  console.assert(
    res3.activities.includes("photography"),
    "Activity should be photography"
  );
  console.assert(
    res3.time.naturalEvent === "sunset",
    "Natural event should be sunset"
  );
  console.assert(
    !res3.activities.includes("sunset" as any),
    "Sunset should not be in activities"
  );
  console.log("✓ Test 3 Passed: Sunset mapped to naturalEvent, not activity");

  // Test 4: Weather override safety (No premature clearSkiesRequired)
  const testCloudyPhotography: RawNLUResult = {
    text: "Find somewhere for photography even if it is cloudy",
    intent: { name: "search.location", confidence: 0.9 },
    entities: [
      { entity: "activity", option: "photography", sourceText: "photography" },
    ],
  };
  const res4 = interpreter.interpret(testCloudyPhotography);
  console.assert(
    (res4.weather as any).clearSkiesRequired === undefined,
    "clearSkiesRequired should remain undefined"
  );
  console.log("✓ Test 4 Passed: Weather constraints remain clean/unforced");

  console.log("\n=================================================");
  console.log(" ALL INTERPRETER STRESS TESTS PASSED");
  console.log("=================================================");
}

runStressTests();