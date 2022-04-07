import { webkit } from 'playwright';

let BROWSER = null;
let CONTEXT = null;

export async function getPage() {
    if(!BROWSER) BROWSER = await webkit.launch();
    if(!CONTEXT) CONTEXT = await BROWSER.newContext();
    return await CONTEXT.newPage();
}

export async function close() {
    await BROWSER.close();
    BROWSER = null;
    CONTEXT = null;
}