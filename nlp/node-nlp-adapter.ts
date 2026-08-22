// nlp/node-nlp-adapter.ts
// @ts-ignore
import { NlpManager } from "node-nlp";
import * as path from "path";
import * as fs from "fs";
import type { RawNLUResult, RawEntity } from "./types.ts";
import { TextPreprocessor } from "./preprocessor.ts";

export class NodeNLPAdapter {
  private manager: any;
  private isLoaded = false;
  private modelPath: string;

  constructor(modelPath?: string) {
    const defaultPath = path.join(process.cwd(), "nlp", "model.nlp");
    this.modelPath = modelPath || defaultPath;
    this.manager = new NlpManager({ languages: ["en"], forceNER: true });
  }

  public async init(): Promise<void> {
    if (this.isLoaded) return;

    if (!fs.existsSync(this.modelPath)) {
      throw new Error(`NLP Model not found at path: ${this.modelPath}. Train model first.`);
    }

    await this.manager.load(this.modelPath);
    this.isLoaded = true;
  }

  public async parse(input: string): Promise<RawNLUResult> {
    if (!this.isLoaded) {
      await this.init();
    }

    // Preprocessing step before NLU inference
    const processedText = TextPreprocessor.normalizeInput(input);
    const result = await this.manager.process("en", processedText);

    const mappedEntities: RawEntity[] = (result.entities || []).map((e: any) => ({
      entity: e.entity,
      sourceText: e.sourceText || e.utteranceText,
      utteranceText: e.utteranceText,
      confidence: e.accuracy ?? 1,
      option: e.option,
      resolution: e.resolution,
    }));

    return {
      text: input, // Preserve original input text
      intent: {
        name: result.intent, // Pure Node-NLP intent output
        confidence: result.score || 0,
      },
      entities: mappedEntities,
    };
  }
}