import fs from 'fs';
import { createLanguageModel, createJsonTranslator, processRequests } from 'typechat';
import { Response } from '../models/Response';
import path from 'path';

export class ChatManager {
  private model;
  private translator;

  constructor() {
    this.model = createLanguageModel(process.env);
    const schema = fs.readFileSync(path.resolve("src/models/Response.ts"), 'utf8');
    this.translator = createJsonTranslator<Response>(this.model, schema, 'Response');
  }

  async processChat(prompt: string) {
    const response = await this.translator.translate(prompt);
    if (!response.success) {
      return;
    }
    return response;
  }
}