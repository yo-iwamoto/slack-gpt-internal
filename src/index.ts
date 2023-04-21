import { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET } from './env';
import { App, ExpressReceiver } from '@slack/bolt';
import { askAi } from './langchain';

const receiver = new ExpressReceiver({
  signingSecret: SLACK_SIGNING_SECRET,
  scopes: ['chat:write'],
  endpoints: '/events',
  processBeforeResponse: true,
});

const app = new App({ receiver, token: SLACK_BOT_TOKEN });

app.event('app_mention', async ({ event: { ts, thread_ts, text, channel, user }, say, logger, client }) => {
  logger.info(`Received message: ${text}, ts: ${ts}`);

  const isInlineMode = thread_ts === undefined && text.includes('--inline');
  const sentMessage = await (() => {
    if (isInlineMode) {
      return say('考え中です...🧐');
    } else {
      return client.chat.postMessage({
        text: '考え中です...🧐',
        thread_ts: thread_ts ?? ts,
        channel,
      });
    }
  })();

  const message = text.replace(/<@.*?>/g, '').trim();
  askAi(message).then(async (result) => {
    console.log({ result });
    logger.info(`Result: ${result}, ts: ${ts}`);
    if (sentMessage.ts === undefined) return;

    if (isInlineMode) {
      await say(`${user !== undefined ? `<@${user}> ` : ''}${result}`);
    } else {
      await client.chat.postMessage({
        text: `${user !== undefined ? `<@${user}> ` : ''}${result}`,
        channel,
        thread_ts: thread_ts ?? ts,
      });
    }

    await client.chat.delete({
      ts: sentMessage.ts,
      channel,
    });
  });
  return;
});

export const handleGpt = receiver.app;
