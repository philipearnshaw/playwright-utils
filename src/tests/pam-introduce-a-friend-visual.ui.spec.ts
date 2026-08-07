import { expect, Page, test } from '@playwright/test';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';
import { externalUrls } from '../constants/constants';

// --------------------------------------------------------------------------------
// Commands:
// yarn test:chromium pam-introduce-a-friend-visual.ui.spec.ts --update-snapshots
// yarn test:chromium pam-introduce-a-friend-visual.ui.spec.ts
// yarn test:chromium pam-introduce-a-friend-visual.ui.spec.ts --reporter=html
// Reporter output is in playwright-report to zip and add to JIRA ticket.
// --------------------------------------------------------------------------------
test.use({
  baseURL: 'https://pam-introduce-a-friend-master-u01.cf.dev-paas.bskyb.com',
  javaScriptEnabled: true,
});

const SCREENSHOT_FOLDER = '__pam_introduce_a_friend_visual__';

const createScreenshotUtils = async (page: Page, path: string): Promise<ScreenshotUtils> => {
  const screenshotUtils = new ScreenshotUtils(page, path, SCREENSHOT_FOLDER);
  await screenshotUtils.navigateAndStabilisePage();
  return screenshotUtils;
};

const expectVisualSnapshot = async (
  page: Page,
  screenshotUtils: ScreenshotUtils,
  snapshotName: string
): Promise<void> => {
  await screenshotUtils.addUrlBanner({ page });
  await screenshotUtils.stabilisePage();

  await expect(page).toHaveScreenshot(snapshotName, {
    fullPage: true,
    animations: 'disabled',
    mask: [page.locator('img[src*=".gif"]')],
  });
};

test.beforeEach(async ({ page }) => {
  await page.route(externalUrls.sky.cdnPrivacyMgmt, (route) => route.abort());
});

test.describe('PAM Introduce A Friend - Refer a Friend', () => {
  const path = 'refer-a-friend';

  test('default', async ({ page }) => {
    const screenshotUtils = await createScreenshotUtils(page, path);
    await expectVisualSnapshot(page, screenshotUtils, 'refer-a-friend-default.png');
  });

  test('open FAQ', async ({ page }) => {
    const screenshotUtils = await createScreenshotUtils(page, path);
    const faqSection = page.getByTestId('raf-home-faqs-section');
    const accordionHeadings = await faqSection.getByTestId(/^raf-home-faqs-accordion-\d+-heading$/).all();

    expect(accordionHeadings.length, 'Expected at least one FAQ accordion heading').toBeGreaterThan(0);

    for (const heading of accordionHeadings) {
      await heading.click();
    }

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1_000);
    await expectVisualSnapshot(page, screenshotUtils, 'refer-a-friend-open-faq.png');
  });

  test('hero CTA navigation', async ({ page }) => {
    const screenshotUtils = await createScreenshotUtils(page, path);

    await page.getByTestId('raf-home-hero-cta').click();
    await page.waitForURL(/invite/i);

    await expectVisualSnapshot(page, screenshotUtils, 'refer-a-friend-hero-cta.png');
  });

  test('vouchers CTA navigation', async ({ page }) => {
    const screenshotUtils = await createScreenshotUtils(page, path);

    await page.getByTestId('raf-home-vouchers-cta').click();
    await page.waitForURL(/invite/i);

    await expectVisualSnapshot(page, screenshotUtils, 'refer-a-friend-vouchers-cta.png');
  });
});

test.describe('PAM Introduce A Friend - Error', () => {
  const path = 'refer-a-friend/error';

  test('default', async ({ page }) => {
    const screenshotUtils = await createScreenshotUtils(page, path);
    await expectVisualSnapshot(page, screenshotUtils, 'refer-a-friend-error-default.png');
  });

  test('error CTA navigation', async ({ page }) => {
    const screenshotUtils = await createScreenshotUtils(page, path);

    await page.getByTestId('raf-error-cta').click();
    await page.waitForURL('**/refer-a-friend/');
    await expect(page.getByTestId('raf-home-faqs-section')).toBeVisible();

    await expectVisualSnapshot(page, screenshotUtils, 'refer-a-friend-error-cta.png');
  });
});

test.describe('PAM Introduce A Friend - Not Found', () => {
  const path = 'refer-a-friend/not-found';

  test('default', async ({ page }) => {
    const screenshotUtils = await createScreenshotUtils(page, path);
    await expectVisualSnapshot(page, screenshotUtils, 'refer-a-friend-not-found-default.png');
  });

  test('404 CTA navigation', async ({ page }) => {
    const screenshotUtils = await createScreenshotUtils(page, path);

    await page.getByTestId('raf-404-cta').click();
    await page.waitForURL('**/refer-a-friend/');
    await expect(page.getByTestId('raf-home-faqs-section')).toBeVisible();

    await expectVisualSnapshot(page, screenshotUtils, 'refer-a-friend-not-found-404-cta.png');
  });
});

const additionalPages = [
  'refer-a-friend/terms-and-conditions',
  'refer-a-friend/invite',
  'refer-a-friend/referral',
  'refer-a-friend/unsubscribe',
];

test.describe('PAM Introduce A Friend - Additional Pages', () => {
  for (const path of additionalPages) {
    test(`default ${path}`, async ({ page }) => {
      const screenshotUtils = await createScreenshotUtils(page, path);
      await expectVisualSnapshot(page, screenshotUtils, `${screenshotUtils.generateFileName(path)}-default.png`);
    });
  }
});
