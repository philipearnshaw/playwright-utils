import { test } from '@playwright/test';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';

test.use({ baseURL: 'https://dt-product-discovery-1175-e05.cf.dev-paas.bskyb.com' });

test.use({ javaScriptEnabled: true });

const FOLDER_NAME = '__dt_product_discovery_screenshots__';

[
  { url: `dt_product_discovery/homepage` },
  { url: `dt_product_discovery/deals/customer` },
  { url: `dt_product_discovery/deals` },
  { url: `dt_product_discovery/deals/tv/stream` },
  { url: `dt_product_discovery/deals/tv/sky-q` },
  { url: `dt_product_discovery/broadband/gaming` },
  { url: `dt_product_discovery/broadband/full-fibre-broadband` },
  { url: `dt_product_discovery/broadband-base` },
  { url: `dt_product_discovery/tvandbroadband` },
  { url: `dt_product_discovery/tv/manage` },
  { url: `dt_product_discovery/tv/sky-q` },
  { url: `dt_product_discovery/tv/stream` },
  { url: `dt_product_discovery/tv` },
  { url: `dt_product_discovery/tv/cinema` },
  { url: `dt_product_discovery/tv/sports` },
  { url: `dt_product_discovery/price-changes` },
  { url: `dt_product_discovery/watch` },
  { url: `dt_product_discovery/mysky` },
  { url: `dt_product_discovery/glass` },
  { url: `dt_product_discovery/glass/glass-air` },
  { url: `dt_product_discovery/glass/glass-gen-2` },
  { url: `dt_product_discovery/glass/43-inch` },
  { url: `dt_product_discovery/glass/55-inch` },
  { url: `dt_product_discovery/glass/65-inch` },
].forEach(({ url }) => {
  test(`screenshot of ${url}`, async ({ page }) => {
    const screenshotUtils = new ScreenshotUtils(page, url, FOLDER_NAME);

    await screenshotUtils.navigateAndStabilisePage();
    await screenshotUtils.takeScreenshot();
  });
});
