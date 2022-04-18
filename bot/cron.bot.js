import logger from "../logger.js";
import cron from 'node-cron';


cron.schedule('*/3 * * * *', () => {
    logger.info('CRON | running a task every 3 minutes');
});