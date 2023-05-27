const { App } = require('@slack/bolt');
const { registerListeners } = require('./listeners');
const html = require('./templates');

require('dotenv').config();
var pjson = require('./package.json');

// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN, //oauth-token
    signingSecret: process.env.SLACK_SIGNING_SECRET, //app configuration page
    //socketMode: true, // add this
    appToken: process.env.SLACK_APP_TOKEN, // events subscription page
    port: process.env.PORT || 3000,
    customRoutes: [{
        path: '/app',
        method: ['GET'],
        handler: (req, res) => {
          res.writeHead(200);
          res.end(html.htmlApp);
        },
      }],
  });

// Listens to incoming messages that contain "hello"
app.message('what version', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say(`I am running version ${pjson.version}`);
});
// Listens to incoming messages that contain "hello"
app.message('hello', async ({ message, say }) => {
    // say() sends a message to the channel where the event was triggered
    await say({
      blocks: [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `Hey there <@${message.user}>!`
          },
          "accessory": {
            "type": "button",
            "text": {
              "type": "plain_text",
              "text": "Click Me"
            },
            "action_id": "button_click"
          }
        }
      ],
      text: `Hey there <@${message.user}>!`
    });
  });
  app.action('button_click', async ({ body, ack, say }) => {
    // Acknowledge the action
    await ack();
    await say(`<@${body.user.id}> clicked the button`);
  });
  registerListeners(app);

  (async () => {
    // Start your app
    await app.start();

    console.log('⚡️ Bolt app is running!');
  })();
