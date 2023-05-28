const { App } = require('@slack/bolt');
var os = require('os')

const { registerListeners } = require('./listeners');
const html = require('./templates');
const request = require('request');
var http = require('http');


// Initializes your app with your bot token and signing secret
const app = new App({
    token: process.env.SLACK_BOT_TOKEN, //oauth-token
    clientId: process.env.SLACK_CLIENT_ID, //app configuration page
    clientSecret: process.env.SLACK_CLIENT_SECRET, //app configuration page
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

  registerListeners(app);


// Listens to incoming messages that contain "hello"
app.message('what version', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`I am running version ${process.env.npm_package_version}`);
});
// Listens to incoming messages that contain "hello"
app.message('Awaiting input for pipeline :', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  var buildId = message.text.split(':')[2]
  var buildDesc = message.text.split(':')[1]
  var slackIcon = ":tada:"
  await say({
    blocks:
          [
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": ":mag: Jenkins Awaits your input *Bra*"
              }
            },
            {
              "type": "divider"
            },
            {
              "type": "section",
              "text": {
                "type": "mrkdwn",
                "text": "*<${env.process.J_URL}/job/jenkins-trigger-pipeline/3/console|Build in Progress>*\nSelect the deploy environment for Your App"
              },
              "accessory": {
                "type": "static_select",
                "placeholder": {
                  "type": "plain_text",
                  "emoji": true,
                  "text": "Manage"
                },
                "options": [
                  {
                    "text": {
                      "type": "plain_text",
                      "emoji": true,
                      "text": "QA"
                    },
                    "value": "QA"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "emoji": true,
                      "text": "DEV"
                    },
                    "value": "DEV"
                  },
                  {
                    "text": {
                      "type": "plain_text",
                      "emoji": true,
                      "text": "STAGING"
                    },
                    "value": "STAGING"
                  }
                ]
              }
            },
            {
              "type": "divider"
            },
            {
              "type": "actions",
              "elements": [
                {
                  "type": "button",
                  "text": {
                    "type": "plain_text",
                    "emoji": true,
                    "text": "Confirm"
                  },
                  "action_id":"click_confirm",
                  "style": "primary",
                  "value": "confirm"
                },
                {
                  "type": "button",
                  "text": {
                    "type": "plain_text",
                    "emoji": true,
                    "text": "Cancel"
                  },
                  "action_id":"click_abort",
                  "style": "danger",
                  "value": "abort"
                }
              ]
            }
          ]
     });
    });
app.action('click_confirm', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  console.log(body)

var form = new FormData();
form.append('env', 'STAGING');
form.append('formNoValidate', 'proceed');
form.Authorization = `${env.process.J_TOKEN}`
var request = http.request({
  method: 'post',
  host:   `${env.process.J_URL}`,
  path: '/job/jenkins-trigger-pipeline/3/input/Tag_id/submit',
  headers: form.headers,
  auth: `shane:${env.process.J_TOKEN}`
});

// https://github.com/form-data/form-data
//form.pipe(request);

request.on('response', function(res) {
  console.log(res.statusCode);
});
  await say(`<@${body.user.id}> clicked the button`);
});
app.action('click_abort', async ({ body, ack, say }) => {
  // Acknowledge the action
  await ack();
  console.log(body)

var form = new FormData();
form.append('env', 'QA');
form.append('formNoValidate', 'abort');
form.Authorization = env.process.J_TOKEN
var request = http.request({
  method: 'post',
 // host: 'env.process.J_URL',
//  path: '/job/jenkins-trigger-pipeline/3/input/Tag_id/submit',
  headers: form.headers,
  auth: `shane:${env.process.J_TOKEN}`
});
form.submit(`${env.process.J_URL}/job/jenkins-trigger-pipeline/3/input/Tag_id/submit`, function(err, res) {
  res.resume();
});
// request.on('response', function(res) {
//   console.log(res.statusCode);
// });

  await say(`<@${body.user.id}> clicked the button`);
});

  (async () => {
    // Start your app
    await app.start();

    console.log('⚡️ Bolt app is running!');
  })();
