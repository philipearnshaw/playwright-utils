import { Locator, test } from '@playwright/test';
import { ScreenshotUtils } from '../utils/ScreenshotUtils';

test.use({
  baseURL:
    'https://pam-key-facts-20964-u01.cf.dev-paas.bskyb.com/key-facts?token=sps-ext-tkn-84be0458-ede9-4a22-8f7c-5ba010f91679',
});

test.use({ javaScriptEnabled: true });

const FOLDER_NAME = '__pam_key_facts_119_screenshots__';

test('key-facts screenshots', async ({ page, baseURL }) => {
  const screenshotUtils = new ScreenshotUtils(page, baseURL as string, FOLDER_NAME);

  const readKeyFactsBtn: Locator = page.locator('[data-test-id="read-key-facts-button"]');
  const keyFactsContinueBtn: Locator = page.locator('[data-test-id="key-facts-continue-button"]');
  const mySkyDownloadBtn: Locator = page.getByRole('button', { name: /Download MySky/i });

  await screenshotUtils.navigateAndStabilisePage();
  await page.waitForTimeout(3_000);
  await screenshotUtils.takeScreenshot({ fileName: 'home-page' });
  await readKeyFactsBtn.click();

  await page.waitForTimeout(2_000);
  await screenshotUtils.takeScreenshot({ fileName: 'bill-page' });
  await keyFactsContinueBtn.click();

  await page.waitForTimeout(2_000);
  await screenshotUtils.takeScreenshot({ fileName: 'contract-page' });
  await keyFactsContinueBtn.click();

  await page.waitForTimeout(2_000);
  await screenshotUtils.takeScreenshot({ fileName: 'equipment-page' });
  await keyFactsContinueBtn.click();

  await page.waitForTimeout(2_000);
  await screenshotUtils.takeScreenshot({ fileName: 'completion-page' });

  await mySkyDownloadBtn.click();
  await page.waitForTimeout(5_000);
  await screenshotUtils.takeScreenshot({ fileName: 'my-sky-app-page' });
});
