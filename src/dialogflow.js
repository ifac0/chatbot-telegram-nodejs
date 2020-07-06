//link: https://dialogflow.cloud.google.com/

const diaglogflow = require('dialogflow');
const config = require('../dio-bot-fit.json');

const sessionClient = new diaglogflow.SessionsClient({
  projectId: config.project_id,
  credentials: {
    private_key: config.private_key,
    client_email: config.client_email,
  },
});

async function sendMessage(chatId, message) {
  const sessionPath = sessionClient.sessionPath(config.project_id, chatId);
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'pt-BR',
      },
    },
  };

  const response = await sessionClient.detectIntent(request);
  const result = response[0].queryResult;

  return {
    text: result.fulfillmentText,
    intent: result.intent.displayName,
    fields: result.parameters.fields
  }
}

module.exports.sendMessage = sendMessage;