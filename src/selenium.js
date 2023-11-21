const {Builder, By, Key, until, } = require('selenium-webdriver');

(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
// Перейти по URL
        await driver.get('http://localhost:4000/?#/about/max');
// Ввести текст "cheese" и нажать на клавиатуре "Enter"
        let price="";
        let startBalance="";
        let curBalance="";
        setTimeout(async () => {
            startBalance = await driver.findElement(By.xpath("//div[@id='balance']")).getText();
        }, 10000)
         setTimeout(async () => {await driver.findElement(By.xpath("//button[@id='APPLbuy']")).click()}, 10000)
        setTimeout(async () => {
            price = await driver.findElement(By.xpath("//div[@id='APPLtext']")).getText();
        }, 10000)
        setTimeout(async () => {
            curBalance = await driver.findElement(By.xpath("//div[@id='balance']")).getText();
            console.log(startBalance)
            console.log(price)
            console.log(curBalance)
            if(parseFloat(curBalance)===(parseFloat(startBalance)-parseFloat(price))){
                console.log("balance right")
            }

        }, 10000)

//         let firstResult = await driver.wait(until.element -
//             Located(By.css('.main__content')), 10000);
//         console.log("wooorks")
//         console.log(await firstResult.getAttribute('textContent'));
    } finally {
        //console.log("wooorks");
        //await driver.quit();
    }
})();