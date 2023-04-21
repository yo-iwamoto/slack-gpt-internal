import { SLACK_BOT_TOKEN, SLACK_SIGNING_SECRET } from './env';
import { App, ExpressReceiver } from '@slack/bolt';
import { http } from '@google-cloud/functions-framework';
import { askAi } from './langchain';

const receiver = new ExpressReceiver({
  signingSecret: SLACK_SIGNING_SECRET,
  scopes: ['chat:write'],
  endpoints: '/events',
  processBeforeResponse: true,
});

const app = new App({ receiver, token: SLACK_BOT_TOKEN });

app.event('app_mention', async ({ event: { ts, thread_ts, text, channel }, say, logger, client }) => {
  logger.info(`Received message: ${text}, ts: ${ts}`);

  const isThreadMode = text.includes('--thread');
  const sentMessage = await (() => {
    if (isThreadMode) {
      return client.chat.postMessage({
        text: '考え中です...🧐',
        thread_ts: thread_ts ?? ts,
        channel,
      });
    } else {
      return say('考え中です...🧐');
    }
  })();

  const message = text.replace(/<@.*?>/g, '').trim();
  askAi(message).then((result) => {
    logger.info(`Result: ${result}, ts: ${ts}`);
    if (sentMessage.ts === undefined) return;

    client.chat.update({
      text: result,
      channel,
      ts: sentMessage.ts,
    });
  });
  return;
});

http('handleGpt', receiver.app);
