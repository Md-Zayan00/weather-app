// nlp/preprocessor.ts
export class TextPreprocessor {
  public static normalizeInput(text: string): string {
    return text
      .replace(/\ban hour and a half\b/gi, "90 minutes")
      .replace(/\bhalf an hour\b/gi, "30 minutes");
  }
}