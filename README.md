# slack-gpt-internal

特に会社固有の実装はないので、自社ワークスペースに Slack App を作成して API Key 等を設定・デプロイすれば誰でも使用できます。

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

deploy.sh にはランタイム変数の設定を含めていないので、デプロイ後に GCP コンソールから設定して再度デプロイするか、deploy.sh を書き換えて `--set-env-vars` を付けてください。


## Development

`app_mention`、`reaction_added` イベントを subscribe しており、開発環境でこれを受け取るには dev server の URL を Slack App の管理画面で設定する必要があります。

```
yarn dev
```

```
ngrok http 8080
// → 表示される Forwarding URL をコピー
```

https://api.slack.com/apps/{yout-app-id}/event-subscriptions で Request URL に {forwarding_url}/events を指定して Save Changes

（ちゃんとやるなら開発環境専用の Slack App を作ってください）
