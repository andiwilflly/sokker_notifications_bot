import logger from "../logger.js";
import SECRET from "../SECRET.js";


export function setupRoutes(telegramBOT, firebase) {
    logger.info('telegram | routes initialized');

    telegramBOT.use(async (ctx, next) => {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        logger.info(`Response time: %sms ${ms}`);
    });


    telegramBOT.hears(/^\/start[ =](.+)$/, async (ctx)=> {
        const teamId = ctx.match[1].split('-')[0];
        const pId = ctx.match[1].split('-')[1];
        const deadline = ctx.match[1].split('-')[2];
        const chat_id = ctx.message.chat_id;

        logger.info('firebase | DB save [user] to users');
        await firebase.DB.collection('users')
            .doc(`${teamId}`)
            .set({
                id: teamId,
                // TODO: club name?
                telegram: {
                    userId: ctx.message.from.id,
                    name: ctx.from.username,
                    chat_id: ctx.message.chat.id,
                }
            });

        // Create transfer in DB (only first time)
        logger.info(`firebase | DB save [transfer pId=${pId}] to transfers`);
        await this.props.DB
            .collection('transfers')
            .doc(`${pId}`)
            .set({ userId: teamId, pId, deadline, chat_id });

        // `https://api.telegram.org/bot${TOKEN}/sendMessage?chat_id=${ctx.message.chat.id}&text=Привет%20мир`
        await ctx.telegram.sendMessage(ctx.message.chat.id, `https://api.telegram.org/bot${SECRET.token}/sendMessage?chat_id=${ctx.message.chat.id}`);
        ctx.reply(`pId: ${pId}, deadlineMs: ${deadline}`);
    });


    telegramBOT.on('text', (ctx) => {
        logger.info('telegramBOT | text');
        logger.info(ctx.update.message.from.id);
    });
}