const puppeteer = require("puppeteer");
const data = require("./src/_data/global.json");

async function captureMultipleScreenshots(urls) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setViewport({ width: 1600, height: 1009 });

  for (let i = 0; i < urls.length; i++) {
    try {
      const url = urls[i];
      await page.goto(url.url);
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: `./src/assets/static/capturas/${url.name}`,
      });
    } catch (error) {
      console.log(error);
    }
  }
  await browser.close();
}

// const urls = data.map((item) => {
//   return {
//     url: item.imageSistema,
//     name: item.nombreSistema.toLowerCase().replace(/ /g, "_"),
//   };
// });

const urls = data.sistemas.map((item) => {
  return {
    url: item.imageUrl,
    name: item.imageSistema,
  };
});

captureMultipleScreenshots(urls);
