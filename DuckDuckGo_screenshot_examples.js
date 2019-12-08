const searchUrl = 'https://duckduckgo.com/';
const searchTerm = 'webdriver';
const titleSearchPage = `${searchTerm} at DuckDuckGo`;
const searchBoxId = 'search_form_input_homepage';

const { Builder, By, Key, until } = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');

const fs = require('fs');

// ChromeDriver
const chromePortableBinary = 'd:\\Internet\\Chrome\\App\\Chrome-bin\\chrome.exe';
const chrome = require('selenium-webdriver/chrome');
const { path } = require('chromedriver');

(async function getAScreenshot() {
  // New portable Chrome
  const service = new chrome.ServiceBuilder(path).build();
  chrome.setDefaultService(service);
  const options = new chrome.Options().setChromeBinaryPath(chromePortableBinary)
  const driver = await new Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .setChromeOptions(options)
    .build();

  try {
    await driver.get(searchUrl);
    await driver.findElement(By.id(searchBoxId)).sendKeys(searchTerm, Key.RETURN);

    await driver.wait(until.titleIs(titleSearchPage), 1000);

    await driver.takeScreenshot().then((image, err) => (
      fs.writeFile('out.png', image, 'base64', () => (
        console.log(`Error: ${err}`)
      ))));
  } finally {
    await driver.quit();
  }
}());
