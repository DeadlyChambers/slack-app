# slack-app
[![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit)](https://github.com/pre-commit/pre-commit)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)


Example used [slack-sample](https://github.com/slack-samples/bolt-js-upgrade-app/blob/main/app.js)
## Using Coventional Commits

Before commiting ensure you understand the [contributing](CONTRIBUTING.md) guide as all commit messages must start with ['fix:', 'feat:', 'docs:', 'chore:'] along with `(scope)`, and/or `!` if you have commited, but not
merged yet. You can edit commits by `git rebase -i`

## Vars

All these tokens can be found [https://api.slack.com/apps/YOUAPPID/general?](https://api.slack.com/apps/A059TAHEWBD/general?)

```shell
export SLACK_BOT_TOKEN=slack.oauth-workspace
export SLACK_SIGNING_SECRET=slack.signing-secret
export SLACK_APP_TOKEN=slack.app-token
```
You should be able to see how they are mapped in app.js

Just keep in mind any scope changes will require a redploy of the app in Slack, as well as updating the SLACK_APP_TOKEN env variable