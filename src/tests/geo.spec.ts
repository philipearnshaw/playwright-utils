import { test, expect } from '../fixtures/ld-json-fixture';
import { dtProductDiscoveryData, appURL } from '../data/dt-product-discovery-data';
import { externalUrls } from '../constants/constants';

test.use({ javaScriptEnabled: false });

test.use({ baseURL: appURL });

dtProductDiscoveryData.forEach(({ url, requiredSchemaTypes }) => {
  test.describe(`GEO: ${url}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.route(externalUrls.sky.cdnPrivacyMgmt, async (route) => {
        return route.abort();
      });
      await page.goto(url);
      await page.waitForTimeout(1_000); // Wait for 1 second to allow any dynamic content to load (adjust as needed)
    });

    // ------------------------------------------------------------------------
    // Output page ld+json data to console
    // ------------------------------------------------------------------------
    test('should output LD+JSON specific elements', async ({ ldJsonPage }) => {
      const dataObjects = await ldJsonPage.getLdJsonData();
      expect(dataObjects.length, `No LD+JSON data objects found for ${url}`).toBeGreaterThan(0);

      dataObjects.forEach((obj) => {
        if (obj['@type'] === 'VideoObject') {
          console.log(JSON.stringify(obj, null, 2), '\n\n---------\n');
        }
      });
    });

    // ------------------------------------------------------------------------
    // Output page ld+json data to console
    // ------------------------------------------------------------------------
    test('should output LD+JSON elements', async ({ ldJsonPage }) => {
      const dataObjects = await ldJsonPage.getLdJsonData();
      expect(dataObjects.length, `No LD+JSON data objects found for ${url}`).toBeGreaterThan(0);

      ldJsonPage.assertRequiredSchemasPresent(dataObjects, requiredSchemaTypes);

      // dataObjects.forEach((obj) => {
      //  console.log(JSON.stringify(obj, null, 2), '\n\n---------\n');
      // });
    });

    // ------------------------------------------------------------------------
    // Validate page ld+json data
    // ------------------------------------------------------------------------
    test('should validate LD+JSON elements', async ({ ldJsonPage }) => {
      const dataObjects = await ldJsonPage.getLdJsonData();
      expect(dataObjects.length, `No LD+JSON data objects found for ${url}`).toBeGreaterThan(0);

      ldJsonPage.assertRequiredSchemasPresent(dataObjects, requiredSchemaTypes);

      for (const dataObject of dataObjects) {
        ldJsonPage.assertLdJsonData(dataObject);
      }
    });
  });
});
