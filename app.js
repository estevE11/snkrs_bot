const puppeteer = require("puppeteer");

const url = "https://www.nike.com/es/launch/";

const cvc = "555";

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // The browser is visible
        ignoreHTTPSErrors: true,
        args: [`--window-size=1500,1000`] // new option
    });
    const page = await browser.newPage();
    await page.goto(url);

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    while(!(hours == 9 && minutes == 0)) {
        date = new Date();
        hours = date.getHours();
        minutes = date.getMinutes();
    }

    await page.evaluate(() => {
        location.reload(true);
    });

    await page.waitForSelector("button[data-qa='feed-buy-cta']");
    await page.click("button[data-qa='feed-buy-cta']");
    await page.waitForSelector("input[id='cvNumber']", {visible: true});
    await page.type("input[id='cvNumber']", cvc);
    await page.click("button[data-qa='save-button']");

    const xp = "//button[contains(., 'Enviar pedido')]";
    await page.waitForXPath(xp);
    const [button] = await page.$x(xp);
    await button.click();
})();