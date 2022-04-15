import logger from "../logger.js";


export function setupRoutes(telegramBOT, firebase) {
    logger.info('telegram | routes initialized');

    // telegramBOT.use(async (ctx, next) => {
    //     const start = new Date();
    //     await next();
    //     const ms = new Date() - start;
    //     console.log('Response time: %sms', ms);
    // });
    //
    //
    // telegramBOT.hears(/^\/start[ =](.+)$/, async (ctx) => {
    //     const teamId = ctx.match[1].split('-')[0];
    //     const pId = ctx.match[1].split('-')[1];
    //     const minutesLeft = ctx.match[1].split('-')[2];
    //
    //     // Save user with [chat_id]
    //     // TODO: Check if exists
    //     // ID - can be team ID
    //     logger.info('firebase | DB save [user] to users');
    //     await firebase.DB.collection('users')
    //         .doc(`${teamId}`)
    //         .set({
    //             id: teamId,
    //             // TODO: club name?
    //             telegram: {
    //                 userId: ctx.message.from.id,
    //                 name: ctx.from.username,
    //                 chat_id: ctx.message.chat.id,
    //             }
    //         });
    //
    //     // `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${ctx.message.chat.id}&text=Привет%20мир`
    //     await ctx.telegram.sendMessage(ctx.message.chat.id, `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${ctx.message.chat.id}&text=Привет%20мир`);
    //     ctx.reply(`pId: ${pId}, minutesLeft: ${minutesLeft}`);
    // });
    //
    //
    // telegramBOT.on('text', (ctx) => {
    //     console.log('text!');
    //     console.log(ctx.update.message.from.id);
    // });
}