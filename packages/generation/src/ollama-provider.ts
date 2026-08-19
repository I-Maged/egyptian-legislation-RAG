import ollama from "ollama";

import type { GenerationProvider, GenerationProviderRequest } from "./provider";

export interface OllamaGenerationProviderOptions {
  model: string;
}

export class OllamaGenerationProvider implements GenerationProvider {
  readonly model: string;

  constructor(options: OllamaGenerationProviderOptions) {
    if (!options.model.trim()) {
      throw new Error("Ollama generation model cannot be empty.");
    }

    this.model = options.model;
  }

  async generate(request: GenerationProviderRequest): Promise<string> {
    const response = await ollama.chat({
      model: this.model,

      messages: [
        {
          role: "system",
          content: request.system,
        },
        {
          role: "user",
          content: request.prompt,
        },
      ],

      options: {
        ...(request.temperature !== undefined
          ? {
              temperature: request.temperature,
            }
          : {}),

        ...(request.maxTokens !== undefined
          ? {
              num_predict: request.maxTokens,
            }
          : {}),
      },
    });

    const answer = response.message.content?.trim();

    if (!answer) {
      throw new Error("Ollama generation returned an empty response.");
    }

    return answer;
  }
}
