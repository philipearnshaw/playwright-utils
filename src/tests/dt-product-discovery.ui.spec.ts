import { test } from '@playwright/test';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';
import { externalUrls } from '../constants/constants';

test.use({
  baseURL: 'https://dt-product-discovery-main-e05.cf.dev-paas.bskyb.com',
  javaScriptEnabled: true,
});

const FOLDER_NAME = '__dt_product_discovery_screenshots__';
const BASE = 'dt_product_discovery';

test.beforeEach(async ({ page }) => {
  await page.route(externalUrls.sky.cdnPrivacyMgmt, (route) => route.abort());
});

const PAGES = [
  `${BASE}/homepage`,
  `${BASE}/deals/customer`,
  `${BASE}/deals`,
  `${BASE}/deals/tv/stream`,
  `${BASE}/deals/tv/sky-q`,
  `${BASE}/broadband/gaming`,
  `${BASE}/broadband/full-fibre-broadband`,
  `${BASE}/broadband-base`,
  `${BASE}/tvandbroadband`,
  `${BASE}/tv/manage`,
  `${BASE}/tv/sky-q`,
  `${BASE}/tv/stream`,
  `${BASE}/tv`,
  `${BASE}/tv/cinema`,
  `${BASE}/tv/sports`,
  `${BASE}/price-changes`,
  `${BASE}/watch`,
  `${BASE}/mysky`,
  `${BASE}/glass`,
  `${BASE}/glass/glass-air`,
  `${BASE}/glass/glass-gen-2`,
  `${BASE}/glass/43-inch`,
  `${BASE}/glass/55-inch`,
  `${BASE}/glass/65-inch`,
];

for (const url of PAGES) {
  test(`screenshot of ${url}`, async ({ page }) => {
    const screenshotUtils = new ScreenshotUtils(page, url, FOLDER_NAME);

    await screenshotUtils.navigateAndStabilisePage();
    await screenshotUtils.takeScreenshotWithUrlBanner();
  });
}
