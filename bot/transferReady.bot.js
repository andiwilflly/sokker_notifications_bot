import { formatDistance } from "date-fns";
import logger from "../logger.js";
import { telegramBOT } from "./index.bot.js";

export default async function onTransferCreated(req, res) {
    logger.info(`transfer | on transfer ready`);
    console.log(req.query);

    // Create transfer in DB
    telegramBOT.telegram.sendMessage(req.query.chat_id, `
        🔥🔥🔥 Player transfer ready | https://sokker.org/player/PID/${req.query.pId} - ${formatDistance(0, +req.query.deadline)}
    `);

    res.send(JSON.stringify({ ok: true }));
}