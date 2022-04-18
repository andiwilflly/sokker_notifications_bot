import cron from 'node-cron';
import { firebase } from "./index.bot.js";
import logger from "../logger.js";


logger.info('CRON | started...');
cron.schedule('*/1 * * * *', async ()=> {
    logger.info('CRON | running a task every 1 minutes');

    const snapshot = await firebase.DB.collection('transfers').get();
    const transfers = snapshot.docs.map(doc => doc.data());

    logger.info('CRON | transfers');
    logger.info(transfers.length);
});