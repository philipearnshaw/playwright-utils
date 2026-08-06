import { Page } from '@playwright/test';

export class ScreenshotUtils {
  private page: Page;
  private url: string;
  private folderName: string;

  public constructor(page: Page, url: string, folderName: string) {
    this.page = page;
    this.url = url;
    this.folderName = folderName;
  }

  public async navigateAndStabilisePage(): Promise<void> {
    await this.page.goto(this.url);
    await this.scrollToDownloadLazyImages();
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  public async stabilisePage(): Promise<void> {
    await this.scrollToDownloadLazyImages();
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }

  public async takeScreenshotWithUrlBanner(options?: {
    fileName?: string;
    fullPage?: boolean;
    page?: Page;
  }): Promise<void> {
    await this.addUrlBanner();
    await this.takeScreenshot(options);
  }

  public async takeScreenshot(options?: { fileName?: string; fullPage?: boolean; page?: Page }): Promise<void> {
    const fullPage = options?.fullPage ?? true;
    const fileName = options?.fileName ?? this.generateFileName(this.url);
    const page = options?.page ?? this.page;

    await page.waitForTimeout(2_000);

    await page.screenshot({
      path: `./${this.folderName}/${fileName}.jpg`,
      type: 'jpeg',
      quality: 80,
      fullPage,
    });
  }

  public async addUrlBanner(options?: { fileName?: string; fullPage?: boolean; page?: Page }): Promise<void> {
    /**
     * Add URL banner to the top of the page before taking the screenshot
     */
    const page = options?.page ?? this.page;
    const currentUrl = page.url();

    await page.evaluate((url) => {
      const banner = document.createElement('div');
      banner.id = '__playwright-url-banner__';
      banner.textContent = `URL: ${url}`;
      banner.style.position = 'fixed';
      banner.style.top = '0';
      banner.style.left = '0';
      banner.style.width = '100%';
      banner.style.padding = '8px 12px';
      banner.style.fontSize = '12px';
      banner.style.fontFamily = 'monospace';
      banner.style.background = 'rgba(0, 0, 0, 0.30)';
      banner.style.color = '#fff';
      banner.style.zIndex = '999999';
      document.body.appendChild(banner);
    }, currentUrl);
  }

  private async scrollToDownloadLazyImages(): Promise<void> {
    for (let i = 0; i < 200; i++) {
      const reachedBottom = await this.page.evaluate(
        () => window.scrollY + window.innerHeight >= document.body.scrollHeight
      );

      if (reachedBottom) {
        await this.page.waitForTimeout(1_000);
        break;
      }

      await this.page.mouse.wheel(0, 400);
      await this.page.waitForTimeout(500);
    }
  }

  public async dumpPageContent(): Promise<void> {
    const html = await this.page.content();
    console.log(`HTML content of ${this.page.url()}:\n`, html);
  }

  public async abortVideos(): Promise<void> {
    await this.page.route('**/*.{mp4,webm,mov,avi,mkv}', async (route) => {
      return route.abort();
    });
  }

  public generateFileName(url: string): string {
    return url.replace(/\//g, '-');
  }
}
