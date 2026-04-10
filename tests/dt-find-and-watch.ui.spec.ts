import { test } from '@playwright/test';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';

test.use({ baseURL: 'https://dt-find-and-watch-main-u01.cf.dev-paas.bskyb.com' });

test.use({ javaScriptEnabled: true });

const FOLDER_NAME = '__dt_find_and_watch_286_screenshots__';

[
  { url: `dt_find_and_watch/series/00389cd3-9e5d-47be-b680-09d4a137fa25` },
  { url: `dt_find_and_watch/programme/bf54862b-014a-337d-816b-8c0fa11eef09` },
].forEach(({ url }) => {
  test(`screenshot of ${url}`, async ({ page }) => {
    const screenshotUtils = new ScreenshotUtils(page, url, FOLDER_NAME);

    await page.goto(url);
    await screenshotUtils.takeScreenshotWithUrlBanner();
  });
});
