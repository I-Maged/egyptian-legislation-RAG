export interface GenerationProviderRequest {
  system: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export interface GenerationProvider {
  readonly model: string;

  generate(request: GenerationProviderRequest): Promise<string>;
}
