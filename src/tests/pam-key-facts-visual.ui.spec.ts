import { expect, test } from '@playwright/test';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';
import { externalUrls } from 'constants/constants';

// Example: https://pam-key-facts-21248-u01.cf.dev-paas.bskyb.com/key-facts?token=sps-ext-tkn-39bd5214-4939-4a9b-abb0-495d3bbe6808
// Example: https://pam-key-facts-master-u01.cf.dev-paas.bskyb.com/key-facts?token=sps-ext-tkn-39bd5214-4939-4a9b-abb0-495d3bbe6808

test.use({
  javaScriptEnabled: true,
  baseURL:
    'https://pam-key-facts-22273-u01.cf.dev-paas.bskyb.com/key-facts?token=sps-ext-tkn-d68eac40-c2fb-4ab0-bcbf-37cd27ffeb5d',
});

const FOLDER_NAME = '__sentinel_245_screenshots__';

test.beforeEach(async ({ page }) => {
  // Applies to *both* page and popup (newPage)
  const context = page.context();
  await context.route(externalUrls.sky.cdnPrivacyMgmt, (route) => route.abort());
});

test('key-facts screenshots', async ({ page, baseURL }) => {
  const screenshotUtils = new ScreenshotUtils(page, baseURL as string, FOLDER_NAME);

  const readKeyFactsBtn = page.getByTestId('read-key-facts-button');
  const keyFactsContinueBtn = page.getByTestId('key-facts-continue-button');

  await screenshotUtils.navigateAndStabilisePage();
  await screenshotUtils.addUrlBanner();
  await page.waitForTimeout(3_000);
  await expect.soft(page).toHaveScreenshot('home-page.png', { fullPage: true });

  await readKeyFactsBtn.click();
  await screenshotUtils.addUrlBanner();
  await page.waitForTimeout(3_000);
  await expect.soft(page).toHaveScreenshot('bill-page.png', { fullPage: true });

  await keyFactsContinueBtn.click();
  await screenshotUtils.addUrlBanner();
  await page.waitForTimeout(3_000);
  await expect.soft(page).toHaveScreenshot('contract-page.png', { fullPage: true });

  await keyFactsContinueBtn.click();
  await screenshotUtils.addUrlBanner();
  await page.waitForTimeout(3_000);
  await expect.soft(page).toHaveScreenshot('equipment-page.png', { fullPage: true });

  await keyFactsContinueBtn.click();
  await screenshotUtils.addUrlBanner();
  await page.waitForTimeout(3_000);
  await expect.soft(page).toHaveScreenshot('completion-page.png', { fullPage: true });
});
