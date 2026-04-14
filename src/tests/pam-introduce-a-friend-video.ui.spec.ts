import { test } from '@playwright/test';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';
import { externalUrls } from '../constants/constants';

test.use({
  baseURL: 'https://pam-introduce-a-friend-20978-n01.stage-cf.sky.com',
  javaScriptEnabled: true,
});

const FOLDER_NAME = '__pam_introduce_a_friend_117_screenshots__';

/**
 * Home page test scenarios:
 * 1. Default state
 * 2. Open FAQ section
 * 3. Click on hero CTA and navigate to invite page
 * 4. Click on vouchers CTA and navigate to invite page
 */
test.describe('PAM Introduce A Friend - Refer a Friend', () => {
  let screenshotUtils: ScreenshotUtils;
  const path = 'refer-a-friend';

  test.beforeEach(async ({ page }) => {
    await page.route(externalUrls.sky.cdnPrivacyMgmt, async (route) => {
      return route.abort();
    });

    await page.screencast.start({ path: 'iaf.webm', size: { width: 1280, height: 800 }, quality: 50 });
    await page.screencast.showActions({ position: 'top-right', fontSize: 10 });

    screenshotUtils = new ScreenshotUtils(page, path, FOLDER_NAME);
    await screenshotUtils.navigateAndStabilisePage();
  });

  test.afterEach(async ({ page }) => {
    await page.screencast.stop();
  });

  test('screenshot after hero CTA navigation', async ({ page }) => {
    await test.step('Start video chapter', async () => {
      await page.screencast.showChapter('Click on hero CTA to sign in');
    });

    await test.step('Click button to navigate', async () => {
      await page.getByTestId('raf-home-hero-cta').click();
      await page.waitForURL(/invite/i);
      await screenshotUtils.addUrlBanner();
    });

    await test.step('End video chapter', async () => {
      await page.screencast.showChapter('Navigated to sign in page');
    });
  });
});
