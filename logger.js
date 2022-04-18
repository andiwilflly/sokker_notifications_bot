import pino from 'pino';


const logger = pino({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            messageFormat: (log, messageKey, levelLabel) => {
                // do some log message customization
                return `{${levelLabel} | {${new Date().toLocaleString()}: ${log}`;
            }
        }
    },
});

logger.info(` `);
logger.info(` `);
logger.info(`server | starting`);

export default logger;