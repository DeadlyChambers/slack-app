require('dotenv').config();
var pjson = require('./package.json').version;

const shortcutCheckVersion = async ({ shortcut, ack, body, client }) => {
    try {
      const { trigger_id } = shortcut;
  
      await ack();
          // eslint-disable-next-line prefer-const
    const view = {
        type: 'modal',
        title: {
          type: 'plain_text',
          text: 'R2D2 version',
        },
        close: {
          type: 'plain_text',
          text: 'Close',
        },
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `Current Version\n\n:sparkles: ${pjson.version}`,
            },
          },
        ],
      };
  
      // Check permission scopes of current installation
      // Can directly check `X-OAuth-Scopes` response header if desired
      // const result = await client.auth.test({});
      // const { scopes } = result.response_metadata;
  
      // Check if current install is using latest scopes by comparing to our .env variable
    //   const upgradeScopes = process.env.SLACK_UPGRADE_SCOPES.split(',');
  
    //   upgradeScopes.forEach((scope) => {
    //     if (!scopes.includes(scope)) {
    //       upgrade = true;
    //     }
    //   });
  
      // If the scopes don't match and we have decided that an app update is available,
      // we can update the blocks to give the user a custom update message
    //   if (process.env.SLACK_PROMPT_INSTALL === 'true') {
    //     view.blocks[0].text.text = `:sparkles: _A new version of this app is available!_\n\n_:sparkles: Click <https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&scope=${process.env.SLACK_UPGRADE_SCOPES}&team=${body.team.id}|here> to upgrade._`;
    //   }
  
      await client.views.open({
        trigger_id,
        view,
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = { shortcutCheckVersion };