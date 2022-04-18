import express from 'express'
import logger from "./logger.js";
import "./bot/index.bot.js";

const app = express();
const port = 3000;


app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/test', (req, res) => {
    logger.info(`test | message`);
});


app.listen(port, () => {
    logger.info(`server | runiing on ${port} port`);
});


