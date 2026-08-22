import { NodeNLPAdapter } from "./node-nlp-adapter.ts";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function evaluate() {
  const modelPath = path.join(__dirname, "model.nlp");
  if (!fs.existsSync(modelPath)) {
    console.error("Error: model.nlp not found. Run npm run nlp:train first.");
    process.exit(1);
  }

  const adapter = new NodeNLPAdapter(modelPath);
  await adapter.init();

  const testCasesPath = path.join(__dirname, "test-cases.json");
  const testCases = JSON.parse(fs.readFileSync(testCasesPath, "utf8"));

  // 1. Inspect Raw NLU Output for key target queries
  console.log("=================================================");
  console.log(" RAW NLU OUTPUT INSPECTION FOR TARGET QUERIES");
  console.log("=================================================");

  const sampleQueries = [
    "Find me somewhere within 2 hours of Seattle for stargazing tonight",
    "I want somewhere quiet within 90 minutes of Kolkata tomorrow morning",
    "I'd like to take photos of the sunset somewhere scenic",
    "Keep me within 50 km and away from crowded places"
  ];

  for (const query of sampleQueries) {
    console.log(`\nQuery: "${query}"`);
    const rawResult = await adapter.parse(query);
    console.dir(rawResult, { depth: null });
  }

  // 2. Category Benchmark Execution
  console.log("\n=================================================");
  console.log(" RUNNING BENCHMARK EVALUATION SUITE");
  console.log("=================================================\n");

  let totalPassed = 0;
  const categoryStats: Record<string, { total: number; passed: number }> = {};

  for (const test of testCases) {
    const category = test.category || "General";
    if (!categoryStats[category]) {
      categoryStats[category] = { total: 0, passed: 0 };
    }
    categoryStats[category].total++;

    // Parse input via NodeNLPAdapter
    const result = await adapter.parse(test.input);

    const detectedEntities = result.entities.map(
      (e) => e.option || e.entity || e.utteranceText || e.sourceText
    );

    const intentMatches = result.intent.name === test.expectedIntent;
    const entitiesMatch = test.expectedEntities.every((expected: string) =>
      detectedEntities.includes(expected)
    );

    if (intentMatches && entitiesMatch) {
      totalPassed++;
      categoryStats[category].passed++;
      console.log(`✓ PASS [${category}]: "${test.input}"`);
    } else {
      console.log(`✗ FAIL [${category}]: "${test.input}"`);
      console.log(`  Expected Intent: "${test.expectedIntent}" | Got: "${result.intent.name}"`);
      console.log(`  Expected Entities: ${JSON.stringify(test.expectedEntities)} | Got: ${JSON.stringify(detectedEntities)}`);
    }
  }

  // 3. Print Performance Summary
  console.log("\n=================================================");
  console.log(" ACCURACY BREAKDOWN BY CATEGORY");
  console.log("=================================================");

  for (const [cat, stats] of Object.entries(categoryStats)) {
    const pct = ((stats.passed / stats.total) * 100).toFixed(1);
    console.log(`${cat.padEnd(30)}: ${stats.passed}/${stats.total} passed (${pct}%)`);
  }

  const overallAccuracy = ((totalPassed / testCases.length) * 100).toFixed(1);
  console.log("-------------------------------------------------");
  console.log(`OVERALL ACCURACY               : ${totalPassed}/${testCases.length} passed (${overallAccuracy}%)\n`);
}

evaluate().catch((err) => console.error(err));