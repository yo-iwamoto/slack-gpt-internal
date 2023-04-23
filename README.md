# slack-gpt-internal

An implementation of AI chat using Langchain and integrates it into Slack bot.

## Getting Started

1. Create .env

```
cp .env.example .env
```

2. Get your OpenAI API Key and set it to .env.

```
OPENAI_API_KEY=<YOUR_API_KEY>
```

3. Create Slack App and get Signing Secret and Bot User OAuth Access Token, and set it.

```
SLACK_SIGNING_SECRET=<YOUR_SLACK_SIGNING_SECRET>
SLACK_BOT_TOKEN=<YOUR_SLACK_BOT_TOKEN>
```

4. Deploy

```
./scripts/deploy.sh
```
