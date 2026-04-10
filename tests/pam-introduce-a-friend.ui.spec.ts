import { expect, test } from '@playwright/test';
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

    screenshotUtils = new ScreenshotUtils(page, path, FOLDER_NAME);
    await page.goto(path);
  });

  test('screenshot of default', async () => {
    await screenshotUtils.takeScreenshotWithUrlBanner({
      fileName: screenshotUtils.generateFileName(`${path}__default`),
    });
  });

  test('screenshot of default with open FAQ', async ({ page }) => {
    const faqSection = page.getByTestId('raf-home-faqs-section');
    const accordionHeadings = await faqSection.getByTestId(/^raf-home-faqs-accordion-\d+-heading$/).all();
    for (const heading of accordionHeadings) {
      await heading.click();
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1_000);

    await screenshotUtils.takeScreenshotWithUrlBanner({
      fileName: screenshotUtils.generateFileName(`${path}__open_faq`),
    });
  });

  test('screenshot after hero CTA navigation', async ({ page }) => {
    await page.getByTestId('raf-home-hero-cta').click();
    await page.waitForURL(/invite/i);
    await screenshotUtils.takeScreenshotWithUrlBanner({
      fileName: screenshotUtils.generateFileName(`${path}__hero_cta`),
    });
  });

  test('screenshot after vouchers CTA navigation', async ({ page }) => {
    await page.getByTestId('raf-home-vouchers-cta').click();
    await page.waitForURL(/invite/i);
    await screenshotUtils.takeScreenshotWithUrlBanner({
      fileName: screenshotUtils.generateFileName(`${path}__vouchers_cta`),
    });
  });
});

/**
 * Error page test scenarios:
 * 1. Default state
 * 2. Click on error CTA and navigate to home page
 */
test.describe('PAM Introduce A Friend - Error', () => {
  let screenshotUtils: ScreenshotUtils;
  const path = 'refer-a-friend/error';

  test.beforeEach(async ({ page }) => {
    await page.route(externalUrls.sky.cdnPrivacyMgmt, async (route) => {
      return route.abort();
    });

    screenshotUtils = new ScreenshotUtils(page, path, FOLDER_NAME);
    await page.goto(path);
  });

  test('screenshot of default', async () => {
    await screenshotUtils.takeScreenshotWithUrlBanner({
      fileName: screenshotUtils.generateFileName(`${path}__default`),
    });
  });

  test('screenshot after error CTA navigation', async ({ page }) => {
    await page.getByTestId('raf-error-cta').click();
    await page.waitForURL('**/refer-a-friend/');

    const faqSection = page.getByTestId('raf-home-faqs-section');
    await expect(faqSection).toBeVisible();
    await screenshotUtils.takeScreenshotWithUrlBanner({
      fileName: screenshotUtils.generateFileName(`${path}__hero_cta`),
    });
  });
});

/**
 * Not Found page test scenarios:
 * 1. Default state
 * 2. Click on error CTA and navigate to home page
 */
test.describe('PAM Introduce A Friend - Not Found', () => {
  let screenshotUtils: ScreenshotUtils;
  const path = 'refer-a-friend/not-found';

  test.beforeEach(async ({ page }) => {
    await page.route(externalUrls.sky.cdnPrivacyMgmt, async (route) => {
      return route.abort();
    });

    screenshotUtils = new ScreenshotUtils(page, path, FOLDER_NAME);
    await page.goto(path);
  });

  test('screenshot of default', async () => {
    await screenshotUtils.takeScreenshotWithUrlBanner({
      fileName: screenshotUtils.generateFileName(`${path}__default`),
    });
  });

  test('screenshot after not found CTA navigation', async ({ page }) => {
    await page.getByTestId('raf-404-cta').click();
    await page.waitForURL('**/refer-a-friend/');

    const faqSection = page.getByTestId('raf-home-faqs-section');
    await expect(faqSection).toBeVisible();
    await screenshotUtils.takeScreenshotWithUrlBanner({
      fileName: screenshotUtils.generateFileName(`${path}__hero_cta`),
    });
  });
});

/**
 * Additional screenshots for other pages (terms and conditions, invite, referral, unsubscribe)
 * 1. Default state
 */
const routes = [
  'refer-a-friend/terms-and-conditions',
  'refer-a-friend/invite',
  'refer-a-friend/referral',
  'refer-a-friend/unsubscribe',
];

test.describe('PAM Introduce A Friend', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(externalUrls.sky.cdnPrivacyMgmt, (route) => route.abort());
  });

  for (const path of routes) {
    test(`screenshot of default - ${path}`, async ({ page }) => {
      const screenshotUtils = new ScreenshotUtils(page, path, FOLDER_NAME);
      await page.goto(path);

      await screenshotUtils.takeScreenshotWithUrlBanner({
        fileName: screenshotUtils.generateFileName(`${path}__default`),
      });
    });
  }
});
