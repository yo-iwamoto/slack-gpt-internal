import { ChatOpenAI } from 'langchain/chat_models/openai';
import { CHAT_OPENAI_MODEL_NAME, OPENAI_API_KEY } from './env';
import { AIChatMessage, HumanChatMessage, SystemChatMessage } from 'langchain/schema';

const openAi = new ChatOpenAI({
  openAIApiKey: OPENAI_API_KEY,
  modelName: CHAT_OPENAI_MODEL_NAME,
  temperature: 0.5,
});

export const askAi = async (message: string, history: { by: 'bot' | 'user'; text: string }[] = []) => {
  const result = await openAi.call([
    new SystemChatMessage(
      'あなたはOpenAIによってトレーニングされた大規模言語モデルのChatGPTです。ユーザーの指示には注意深く従ってください。Slack メッセージ用のマークダウンを使用して応答してください。',
    ),
    ...history.map((message) =>
      message.by === 'bot' ? new AIChatMessage(message.text) : new HumanChatMessage(message.text),
    ),
    new HumanChatMessage(message),
  ]);

  return result.text;
};
