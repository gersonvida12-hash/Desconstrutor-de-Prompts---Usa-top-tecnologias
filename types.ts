// Fix: Define TypeScript types for the application data structures.
export interface PromptTechnique {
  title: string;
  description: string;
  example: string;
}

export interface AnalysisResult {
  summary: string;
  techniques: PromptTechnique[];
}
