import { Telegraf, Markup } from 'telegraf';
import { getPage, close } from './sokker/browser.js';
import login from './sokker/login.js';
import transfers from './sokker/transfers.js';

const TOKEN = '5120962280:AAHrTpFYLqaqtvcDQnwUy5xYs-seorxoZTc';
const bot = new Telegraf(TOKEN);


bot.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log('Response time: %sms', ms);
})


bot.on('text', (ctx) => {
    console.log('text!');
    console.log(ctx);
})


//bot.command('start', ctx => ctx.reply('start!'))
//bot.hears(/^\/start (.*)$/, ctx => ctx.reply('hears!!'));

bot.hears(/^\/start[ =](.+)$/, (ctx) => {
    const pId = ctx.match[1].split('-')[0];
    const minutesLeft = ctx.match[1].split('-')[1];

    console.log(ctx.message);
    // https://api.telegram.org/bot${TOKEN}/getMe

    // `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${ctx.message.chat.id}&text=Привет%20мир`
    ctx.telegram.sendMessage(ctx.message.chat.id, `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${ctx.message.chat.id}&text=Привет%20мир`);
    ctx.reply(`pId: ${pId}, minutesLeft: ${minutesLeft}`);
})


let interval = null;
bot.command('/transfers', async (ctx)=> {
    if(interval) {
        clearInterval(interval);
        interval = null;
        close();
        return ctx.reply('Stop scanning transfer players');
    }

    ctx.reply('Start scanning transfer players...');

    const page = await getPage();
    await login(page);

    interval = setInterval(async ()=> {
        const latestTransfers = await transfers(page);
        if(latestTransfers.length) ctx.reply((latestTransfers).join('\n'));
       // if(!latestTransfers.length) ctx.reply('no latest transfers');
    }, 60000 * 5);
});

bot.launch();


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))