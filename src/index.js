//link:  t.me/dio_ifac_bot

const TelegramBot = require('node-telegram-bot-api');
const dialogflow = require('./dialogflow');
const youtube = require('./youtube');

const token = '1281025873:AAGBE1oYNGMRaCjbG9zmsD82ae8zEAMuO40';

const bot = new TelegramBot(token, { polling: true });

bot.on('message', async function (msg) {
  const chatId = msg.chat.id;

  const dfResponse = await dialogflow.sendMessage(chatId.toString(), msg.text);

  let responseText = dfResponse.text;
  if (dfResponse.intent === 'Youtube - Specific Training') {
    responseText = await youtube.searchVideoURL(responseText, dfResponse.fields.corps.stringValue);
  }

  bot.sendMessage(chatId, responseText);
});
