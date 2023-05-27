# slack-app
Trying out creating a slack app

## Vars

All these tokens can be found [https://api.slack.com/apps/YOUAPPID/general?](https://api.slack.com/apps/A059TAHEWBD/general?)

```shell
export SLACK_BOT_TOKEN=slack.oauth-workspace
export SLACK_SIGNING_SECRET=slack.signing-secret
export SLACK_APP_TOKEN=slack.app-token
```
You should be able to see how they are mapped in app.js

Just keep in mind any scope changes will require a redploy of the app in Slack, as well as updating the SLACK_APP_TOKEN env variable