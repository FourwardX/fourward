import fs from 'fs';
import path from 'path';
import { createLanguageModel, createJsonTranslator, processRequests } from 'typechat';
import { Response } from '../models/Response';

class ChatManager {
  private model;
  private translator;

  constructor() {
    this.model = createLanguageModel(process.env);
    const schemeDir = path.join(__dirname, '../../../','src' ,'models');
    const schema = fs.readFileSync(path.join(schemeDir, 'Response.ts'), 'utf8');
    console.log('schema: ', schema);

    this.translator = createJsonTranslator<Response>(this.model, schema, 'Response');
  }

  async processChat() {
    const response = await this.translator.translate("Provide me the step to cook an egg.");
    if (!response.success) {
      console.log(response.message);
      return;
    }
    console.log(response.data);
  }
}
const chatManagerInstance = new ChatManager();

export default chatManagerInstance;