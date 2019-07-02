process.env.NTBA_FIX_319 = 1
const mongodbClient = require('./mongodb')
const TelegramBot = require('node-telegram-bot-api');
const qr = require('qr-image');
const fetch = require('node-fetch');

const token = '891223485:AAHWWQfzP4gEqOnOkkc-INeSnDoh_xzPlRI';


const bot = new TelegramBot(token, {polling: true});

require('https').createServer().listen(process.env.PORT || 5001).on('request', function(req, res){
    res.end('')
});

bot.on('message', (msg) => {
    console.log(123);
})

bot.onText(/\/get (.+)/, async (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match[1];

    let isTask = await mongodbClient.isTask(resp, msg.from);
    console.log(isTask);
    if (isTask) {
        var qr_svg = qr.imageSync(`${resp}`, { type: 'png' });
        bot.sendPhoto(chatId, qr_svg);
        bot.sendMessage(chatId, `QrCode для ${resp} коинов`);
    } else {
        bot.sendMessage(chatId, `Такого задания нет`);
    }
});