export interface RawEntity {
  entity: string;
  sourceText?: string;
  utteranceText?: string;
  confidence?: number;
  option?: string;
  resolution?: any;
}

export interface RawNLUResult {
  text: string;
  intent: {
    name: string;
    confidence: number;
  };
  entities: RawEntity[];
}