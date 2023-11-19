const {Builder, By, Key, until, } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
// Перейти по URL
        await driver.get('http://localhost:4000/?#/about/max');
// Ввести текст "cheese" и нажать на клавиатуре "Enter"
         await driver.findElement(By.xpath("//button[@id='admin']"));
//         let firstResult = await driver.wait(until.element -
//             Located(By.css('.main__content')), 10000);
//         console.log("wooorks")
//         console.log(await firstResult.getAttribute('textContent'));
    } finally {
        console.log("wooorks");
        await driver.quit();
    }
})();