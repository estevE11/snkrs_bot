const puppeteer = require("puppeteer");

const TEST = true;

const url = "https://www.nike.com/es/launch/t/womens-dunk-high-varsity-purple";
const size = 11;

const mail = 'Coconaut7@gmail.com';
const pass = 'z9wkqVC0hAOfaGw1wpBNfUFPrHoaOq';
const cvc = "555";

(async () => {
    const browser = await puppeteer.launch({
        headless: false, // The browser is visible
        ignoreHTTPSErrors: true,
        args: [`--window-size=1500,1000`] // new option
    });
    const page = await browser.newPage();
    await page.goto(url + "?size=" + size);
    
    await page.waitFor(1000);
    await page.click("button[data-qa='feed-buy-cta']");
    await page.waitFor(500);
    await page.type("[name='emailAddress']", mail);
    await page.type("[name='password']", pass);
    await page.waitFor(2000);
    await page.click("input[type=button]");

    await page.waitFor(1000);

    await page.click("button[data-qa='feed-buy-cta']");
    await page.waitFor(1000);
    await page.type("[id='cvNumber']", cvc);
    await page.click("button[data-qa='save-button']");
    if(!test)await page.click("button[data-qa='save-button']");    
})();
