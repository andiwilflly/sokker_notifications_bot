// https://sokker.org/api/auth/login
// login: "fireinside8888"
// password: "fireinside"
// remember: true

async function login(page) {
    await page.goto('https://sokker.org/en/app/login/');

    await page.fill('input[name="login"]', 'fireinside8888');
    await page.fill('input[name="password"]', 'fireinside');

    page.screenshot({ path: 'screen1.png' });

    await page.click('button[type="submit"]');
    await page.waitForTimeout(5000);

    page.screenshot({ path: 'screen2.png' });

    //await page.click('.modal__close');

    console.log('end login');
}

export default login;