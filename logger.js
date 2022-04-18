import pino from 'pino';


const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
});

logger.info(` `);
logger.info(` `);
logger.info(`server | starting`);

export default logger;