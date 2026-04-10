import { LdJsonPage } from '../pages/LdJsonPage';
import { test as base } from '@playwright/test';

type LdJsonFixtures = {
  ldJsonPage: LdJsonPage;
};

export const test = base.extend<LdJsonFixtures>({
  ldJsonPage: async ({ page }, use) => {
    const ldJsonPage = new LdJsonPage(page);
    await use(ldJsonPage);
  },
});
export { expect } from '@playwright/test';
