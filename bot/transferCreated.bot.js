import logger from "../logger.js";
import { telegramBOT } from "./index.bot.js";

export default async function onTransferCreated(req, res) {
    logger.info(`transfer | on transfer created`);
    console.log(req.query);

    // Create transfer in DB
    telegramBOT.telegram.sendMessage(req.query.chat_id, `
        ✅ Subscribed to player | https://sokker.org/player/PID/${req.query.pId}
    `);

    res.send(JSON.stringify({ ok: true }));
}