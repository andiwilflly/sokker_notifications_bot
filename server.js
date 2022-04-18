import express from 'express';
import bodyParser from 'body-parser';
import logger from "./logger.js";
import "./bot/index.bot.js";
import onTransferCreated from "./bot/transferCreated.bot.js";
import onTransferReady from "./bot/transferReady.bot.js";

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));

app.get('/', (req, res)=> {
    res.send('Hello World1')
});

app.get('/test', (req, res)=> {
    logger.info(`test | message`);
    res.send('test | message');
});


app.get('/transferCreated', onTransferCreated);
app.get('/transferReady', onTransferReady);


app.listen(port, () => {
    logger.info(`server | runiing on ${port} port`);
});


