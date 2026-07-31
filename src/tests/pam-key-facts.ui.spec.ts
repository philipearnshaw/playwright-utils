import { Locator, test } from '@playwright/test';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';
import { externalUrls } from 'constants/constants';

// Example: https://pam-key-facts-21248-u01.cf.dev-paas.bskyb.com/key-facts?token=sps-ext-tkn-39bd5214-4939-4a9b-abb0-495d3bbe6808
// Example: https://pam-key-facts-master-u01.cf.dev-paas.bskyb.com/key-facts?token=sps-ext-tkn-39bd5214-4939-4a9b-abb0-495d3bbe6808

test.use({
  javaScriptEnabled: true,
  baseURL:
    'https://pam-key-facts-22241-u01.cf.dev-paas.bskyb.com/key-facts?token=sps-ext-tkn-0e1a1cd8-174d-40db-af73-b0564d5c4f2e',
});

const FOLDER_NAME = '__sentinel_245_screenshots__';

test.beforeEach(async ({ page }) => {
  // Applies to *both* page and popup (newPage)
  const context = page.context();
  await context.route(externalUrls.sky.cdnPrivacyMgmt, (route) => route.abort());

  await page.screencast.start({ path: 'key-facts.webm', size: { width: 1280, height: 800 }, quality: 50 });
  await page.screencast.showActions({ position: 'top-right', fontSize: 10 });
});

test.afterEach(async ({ page }) => {
  await page.screencast.stop();
});

test('key-facts screenshots', async ({ page, baseURL }) => {
  const screenshotUtils = new ScreenshotUtils(page, baseURL as string, FOLDER_NAME);

  const readKeyFactsBtn: Locator = page.locator('[data-test-id="read-key-facts-button"]');
  const keyFactsContinueBtn: Locator = page.locator('[data-test-id="key-facts-continue-button"]');
  const mySkyDownloadBtn: Locator = page.getByRole('button', { name: /Download MySky/i });

  await screenshotUtils.navigateAndStabilisePage();
  await page.waitForTimeout(3_000);
  await screenshotUtils.takeScreenshotWithUrlBanner({ fileName: 'home-page' });
  await readKeyFactsBtn.click();

  await page.waitForTimeout(2_000);
  await screenshotUtils.takeScreenshotWithUrlBanner({ fileName: 'bill-page' });
  await keyFactsContinueBtn.click();

  await page.waitForTimeout(2_000);
  await screenshotUtils.takeScreenshotWithUrlBanner({ fileName: 'contract-page' });
  await keyFactsContinueBtn.click();

  await page.waitForTimeout(2_000);
  await screenshotUtils.takeScreenshotWithUrlBanner({ fileName: 'equipment-page' });
  await keyFactsContinueBtn.click();

  await page.waitForTimeout(2_000);
  await screenshotUtils.takeScreenshotWithUrlBanner({ fileName: 'completion-page' });

  // clicks the download my sky button and this opens a new page which we need to take a screenshot of
  const [newPage] = await Promise.all([page.waitForEvent('popup'), mySkyDownloadBtn.click()]);
  await newPage.waitForTimeout(3_000);

  // Switches to new page that needs passing to screenshot utils
  await screenshotUtils.takeScreenshotWithUrlBanner({ fileName: 'my-sky-app-page', page: newPage });
});
