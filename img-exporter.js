const puppeteer = require('puppeteer');
const data = require('./src/_data/global.json');

const userAgent =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';

async function captureMultipleScreenshots(urls) {
  const browser = await puppeteer.launch({ ignoreHTTPSErrors: true, headless: "new" });
  const page = await browser.newPage();

  await page.setUserAgent(userAgent);
  await page.setViewport({ width: 1200, height: 810 });

  for (let i = 0; i < urls.length; i++) {
    try {
      const url = urls[i];
      console.log(`Capturando screenshot ${i + 1} de ${urls.length}`);
      await page.goto(url.url);
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: `./src/assets/static/capturas/${url.name}`,
      });
      console.log(`Screenshot ${i + 1} capturada: ${url.name}`);
    } catch (error) {
      console.log(`Error al capturar screenshot ${i + 1}: ${error}`);
    }
  }

  await browser.close();
  console.log('Proceso de captura de screenshots completado.');
}

const urls = data.sistemas.map((item) => {
  return {
    url: item.imageUrl,
    name: item.imageSistema,
  };
});

captureMultipleScreenshots(urls);
