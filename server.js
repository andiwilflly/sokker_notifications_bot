import express from 'express';
import bodyParser from 'body-parser';
import logger from "./logger.js";
import "./bot/index.bot.js";
import onTransferCreated from "./bot/transferCreated.bot.js";

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res)=> {
    res.send('Hello World1')
});

app.get('/test', (req, res)=> {
    logger.info(`test | message`);
    res.send('test | message');
});


app.post('/transferCreated', onTransferCreated);


app.listen(port, () => {
    logger.info(`server | runiing on ${port} port`);
});


