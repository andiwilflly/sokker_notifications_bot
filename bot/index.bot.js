import { Telegraf } from 'telegraf';
import admin from "firebase-admin";
import SECRET from "../SECRET.js";
import { setupRoutes } from "./routes.bot.js";
import logger from "../logger.js";


const app = admin.initializeApp({
    credential: admin.credential.cert(SECRET.firebase),
    databaseURL: "https://sokker-observer.firebaseio.com"
});
logger.info('firebase admin | started');

export const telegramBOT = new Telegraf(SECRET.token);
export const firebase = {
    app,
    DB: app.firestore()
};

setupRoutes(telegramBOT, firebase);
telegramBOT.launch();
logger.info('telegram bot | started');
logger.error(e.toString());


process.once('SIGINT', () => telegramBOT.stop('SIGINT'));
process.once('SIGTERM', () => telegramBOT.stop('SIGTERM'));