"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLACK_BOT_TOKEN = exports.SLACK_SIGNING_SECRET = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
if (process.env.NODE_ENV === 'development') {
    dotenv_1.default.config();
}
exports.SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
exports.SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
//# sourceMappingURL=env.js.map