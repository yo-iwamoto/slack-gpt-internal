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
const env_1 = require("./env");
const bolt_1 = require("@slack/bolt");
const functions_framework_1 = require("@google-cloud/functions-framework");
const langchain_1 = require("./langchain");
const receiver = new bolt_1.ExpressReceiver({
    signingSecret: env_1.SLACK_SIGNING_SECRET,
    scopes: ['chat:write'],
    endpoints: '/events',
    processBeforeResponse: true,
});
const app = new bolt_1.App({ receiver, token: env_1.SLACK_BOT_TOKEN });
app.event('app_mention', ({ event: { ts, text, channel }, context, say, logger, client }) => __awaiter(void 0, void 0, void 0, function* () {
    logger.info(`Received message: ${text}, ts: ${ts}`);
    const sentMessage = yield say('考え中です...🧐');
    const message = text.replace(/<@.*?>/g, '').trim();
    (0, langchain_1.askAi)(message).then((result) => {
        logger.info(`Result: ${result}, ts: ${ts}`);
        if (sentMessage.ts === undefined)
            return;
        client.chat.update({
            text: result,
            channel,
            ts: sentMessage.ts,
        });
    });
    return;
}));
(0, functions_framework_1.http)('handleSlack', receiver.app);
//# sourceMappingURL=index.js.map