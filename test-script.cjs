const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:5174/'); // vite runs on 5174 now
  await page.waitForTimeout(2000); // wait for initial animation
  await page.screenshot({ path: '/home/jules/verification/screenshots/verification-flex-start.png' });
  await browser.close();
})();
