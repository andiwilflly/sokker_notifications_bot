import { Telegraf } from 'telegraf';
import { getPage, close } from './sokker/browser.js';
import login from './sokker/login.js';
import transfers from './sokker/transfers.js';
import admin from "firebase-admin";
import serviceAccount from "./sokker-observer-firebase-adminsdk-vz2in-65dc4bcd3b.js"


const TOKEN = '5120962280:AAHrTpFYLqaqtvcDQnwUy5xYs-seorxoZTc';
const bot = new Telegraf(TOKEN);

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sokker-observer.firebaseio.com"
});

const DB = app.firestore();

//
// bot.use(async (ctx, next) => {
//     const start = new Date();
//     await next();
//     const ms = new Date() - start;
//     console.log('Response time: %sms', ms);
// });
//
//
// bot.hears(/^\/start[ =](.+)$/, async (ctx) => {
//     const teamId = ctx.match[1].split('-')[0];
//     const pId = ctx.match[1].split('-')[1];
//     const minutesLeft = ctx.match[1].split('-')[2];
//
//     // Save user with [chat_id]
//     // TODO: Check if exists
//     // ID - can be team ID
//     await DB.collection('users')
//         .doc(`${teamId}`)
//         .set({
//         id: teamId,
//             // TODO: club name?
//         telegram: {
//             userId: ctx.message.from.id,
//             name: ctx.from.username,
//             chat_id: ctx.message.chat.id,
//         }
//     });
//
//     // `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${ctx.message.chat.id}&text=Привет%20мир`
//     ctx.telegram.sendMessage(ctx.message.chat.id, `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${ctx.message.chat.id}&text=Привет%20мир`);
//     ctx.reply(`pId: ${pId}, minutesLeft: ${minutesLeft}`);
// });
//
//
// bot.on('text', (ctx) => {
//     console.log('text!');
//     console.log(ctx.update.message.from.id);
// })
//
//
// let interval = null;
// bot.command('/transfers', async (ctx)=> {
//     if(interval) {
//         clearInterval(interval);
//         interval = null;
//         close();
//         return ctx.reply('Stop scanning transfer players');
//     }
//
//     ctx.reply('Start scanning transfer players...');
//
//     const page = await getPage();
//     await login(page);
//
//     interval = setInterval(async ()=> {
//         const latestTransfers = await transfers(page);
//         if(latestTransfers.length) ctx.reply((latestTransfers).join('\n'));
//        // if(!latestTransfers.length) ctx.reply('no latest transfers');
//     }, 60000 * 5);
// });

bot.launch();


process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))