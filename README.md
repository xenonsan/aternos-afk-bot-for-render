# Aternos AFK Bot for Render

Aternosのサーバーを24時間稼働させるためのAFKボットです。Render.comで簡単に動かせるように最適化されています。

## Render.com へのデプロイ方法

1. このリポジトリを自分のGitHubアカウントにフォーク、またはアップロードします。
2. [Render.com](https://render.com/) にログインします。
3. **New +** ボタンから **Blueprint** を選択します。
4. 自分のリポジトリを選択します。
5. 環境変数の設定画面で以下の値を設定します（または `render.yaml` が自動で読み込まれます）：
   * `SERVER_IP`: あなたの Aternos の IP (例: `example.aternos.me`)
   * `SERVER_PORT`: `25565` (デフォルト)
   * `BOT_NAME`: ボットの名前
   * `VERSION`: サーバーのマイクラバージョン (例: `1.20.1` / 指定しない場合は自動検出を試みます)
6. **Apply** をクリックしてデプロイが完了するのを待ちます。

## local での実行方法

1. `npm install` を実行します。
2. `config.json` にサーバー情報を記述します。
3. `node index.js` で起動します。

### 注意事項

* Aternosのサーバーバージョンが1.16.5以外の場合は、サーバーに `ViaVersion` などのプラグインを入れるか、環境変数 `VERSION` で正しいバージョンを指定してください。
* ボットがKickされた場合、30秒後に自動で再接続を試みます。
* Renderの無料枠（Free Tier）では、Webサービスは一定時間アクセスがないとスリープします。これを防ぐには、[UptimeRobot](https://uptimerobot.com/) などで Render の URL (例: `https://your-app.onrender.com/`) を定期的に監視（Ping）してください。

### 連絡先

不具合があれば、元のプロジェクトのDiscordサーバーなどで確認してください。
