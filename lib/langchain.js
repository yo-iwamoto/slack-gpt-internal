"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.askAi = void 0;
const openai_1 = require("langchain/llms/openai");
const env_1 = require("./env");
const openAi = new openai_1.OpenAI({
    openAIApiKey: env_1.OPENAI_API_KEY,
    modelName: 'gpt-3.5-turbo',
    maxTokens: 200,
});
const askAi = (message) => __awaiter(void 0, void 0, void 0, function* () {
    return openAi.call([
        'あなたはOpenAIによってトレーニングされた大規模言語モデルのChatGPTです。ユーザーの指示には注意深く従ってください。Slack メッセージ用のマークダウンを使用して応答してください。',
        message,
    ].join('\n'));
});
exports.askAi = askAi;
//# sourceMappingURL=langchain.js.map