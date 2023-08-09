import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

export const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET as string;
export const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN as string;
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY as string;
export const CHAT_OPENAI_MODEL_NAME = process.env.CHAT_OPENAI_MODEL_NAME as string;
