import { formatDistance } from "date-fns";
import { firebase, telegramBOT } from "./index.bot.js";
import logger from "../logger.js";


logger.info('CRON | started...');
setInterval(async ()=> {
    const snapshot = await firebase.DB.collection('transfers').get();
    const transfers = snapshot.docs.map(doc => doc.data());

    transfers.forEach(transfer => {
        const soon = 1000 * 60 * 5;

        const isEndsSoon = transfer.deadline - Date.now() <= soon;

        if(!isEndsSoon) {
            console.log('herer...', transfer);
            console.log(transfers.deadline - Date.now(), isEndsSoon);
            telegramBOT.telegram.sendMessage(transfer.chat_id, `
                🔥🔥🔥 Player transfer ready | https://sokker.org/player/PID/${transfer.pId} - ${formatDistance(transfer.deadline, Date.now())}
            `);
            // Remove transfer from DB
            firebase.DB.collection('transfers').doc(transfer.pId).delete();
        }
    });

}, 1000 * 60 * 0.5);