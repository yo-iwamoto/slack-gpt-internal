import { OpenAI } from 'langchain/llms/openai';
import { OPENAI_API_KEY } from './env';

const openAi = new OpenAI({
  openAIApiKey: OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo',
  maxTokens: 200,
});

export const askAi = async (message: string) =>
  openAi.call(
    [
      'あなたはOpenAIによってトレーニングされた大規模言語モデルのChatGPTです。ユーザーの指示には注意深く従ってください。Slack メッセージ用のマークダウンを使用して応答してください。',
      message,
    ].join('\n'),
  );
