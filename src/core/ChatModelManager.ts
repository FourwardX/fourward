import { createLanguageModel, createJsonTranslator, processRequests } from 'typechat';
import fs from 'fs';
import path from 'path';
import { ImageKeyword } from '@/models/ImageKeywords';
import { Instruction } from '@/models/Instruction';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';
import { InstructionResult } from '@/models/InstructionResult';

export class ChatModelManager<T extends object> {
  private model;
  private translator;

  constructor(schemaPath: string, schemaType: string) {
    this.model = createLanguageModel(process.env);
    const schema = fs.readFileSync(schemaPath, 'utf8');
    this.translator = createJsonTranslator<T>(this.model, schema, schemaType);
  }

  async processChat(prompt: string): Promise<T | null> {
    const response = await this.translator.translate(prompt);
    if (!response.success) {
      return null;
    }
    return response.data as T; // Cast as T
  }

  static createInstances() {
    const imgModelPath = path.resolve("src/models/ImageKeywords.ts");
    const modelPath = path.resolve("src/models/Instruction.ts");

    const imgInstance = new ChatModelManager<ImageKeyword>(imgModelPath, 'ImageKeyword');
    const instructionInstance = new ChatModelManager<Instruction>(modelPath, 'Instruction');

    return { imgInstance, instructionInstance };
  }
  static async generateStorybook(prompt: string) {
    const size = "256x256";
    const n = 1;
    const endpoint = process.env["AZURE_OPENAI_DALLE_ENDPOINT"] ?? "";
    const azureApiKey = process.env["AZURE_OPENAI_API_KEY"] ?? "";
    try {
      const { instructionInstance, imgInstance } = ChatModelManager.createInstances();
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));

      const res = await instructionInstance.processChat(prompt) as InstructionResult;
      console.log("Instruction before process result:", res);

      for (const element of res.Steps) {
        const imgRes = await imgInstance.processChat(element.description);
        if (imgRes?.keyword) {
          const results = await client.getImages(imgRes.keyword, { n, size });
          for (const image of results.data) {
            if ('url' in image) {
              element.img = image.url;
            }
          }
        }
      }

      console.log("Instruction result:", res);
      return res;
    } catch (err) {
      return null;
    }
  }
  
}
