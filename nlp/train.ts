// @ts-ignore
import { NlpManager } from "node-nlp";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function train() {
  const manager = new NlpManager({
    languages: ["en"],
    forceNER: true,
  });

  const corpusPath = path.join(__dirname, "corpus.json");
  const corpusData = JSON.parse(fs.readFileSync(corpusPath, "utf8"));

  // Add Intent Utterances
  for (const item of corpusData.data) {
    for (const utterance of item.utterances) {
      manager.addDocument(corpusData.locale, utterance, item.intent);
    }
  }

  // Add Named Entities directly via manager
  for (const [entityName, entityData] of Object.entries(corpusData.entities)) {
    const options = (entityData as any).options;
    for (const [optionKey, optionValues] of Object.entries(options)) {
      manager.addNamedEntityText(
        entityName,
        optionKey,
        [corpusData.locale],
        optionValues as string[]
      );
    }
  }

  console.log("Training model...");
  await manager.train();

  const modelPath = path.join(__dirname, "model.nlp");
  manager.save(modelPath);
  console.log(`Model successfully trained and saved to ${modelPath}`);
}

train().catch((err) => console.error(err));