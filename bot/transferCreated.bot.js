import logger from "../logger.js";

export default function onTransferCreated(req, res) {
    logger.info(`transfer | on transfer created`);
    logger.info(req.body);
}