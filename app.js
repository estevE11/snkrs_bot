const puppeteer = require("puppeteer");

const TEST = false;

const url = "https://www.nike.com/es/launch/t/air-jordan-1-j-balvin";
const size = 11;

const cvc = "555";

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // The browser is visible
        ignoreHTTPSErrors: true,
        args: [`--window-size=1500,1000`] // new option
    });
    const page = await browser.newPage();
    await page.goto(url + "?size=" + size);
    /*
    await page.waitForSelector("button[data-qa='feed-buy-cta']");
    await page.click("button[data-qa='feed-buy-cta']");
    await page.waitForSelector("[name='emailAddress']");
    await page.type("[name='emailAddress']", mail);
    await page.type("[name='password']", pass);
    await page.waitForSelector("input[type=button]");
    await page.click("input[type=button]");
*/

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    while(!(hours == 9 && minutes == 0)) {
        date = new Date();
        hours = date.getHours();
        minutes = date.getMinutes();
    }

    await page.evaluate(() => {
        location.reload(true)
    });

    await page.waitForSelector("button[data-qa='feed-buy-cta']");
    await page.click("button[data-qa='feed-buy-cta']");
    await page.waitForSelector("input[id='cvNumber']", {visible: true});
    await page.type("input[id='cvNumber']", cvc);
    await page.click("button[data-qa='save-button']");
    if(!TEST){
        const xp = "//button[contains(., 'Enviar pedido')]";
        await page.waitForXPath(xp);
        const [button] = await page.$x(xp);
        await button.click();
    }
})();