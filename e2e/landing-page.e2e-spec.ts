import { browser } from 'protractor';
import { LandingPage } from './pages/landing.page';

describe('Services Manager index view', () => {
  let page: LandingPage;

  beforeEach(() => {
    page = new LandingPage();
  });

  it('should display at least one client card', async () => {
    await page.navigateTo();
    const clientCount = await page.clientPreviewCardElements.count();
    expect(clientCount).toBeGreaterThan(0);
  });

  it('should navigate to "EOAS BP" client page when card is clicked', async () => {
    await page.navigateTo();
    const client = await page.getClientPreviewCardElement('EOAS BP');
    expect(client).toBeTruthy();
    await client.click();
    const clientUrl = await browser.getCurrentUrl();
    expect(clientUrl).toContain('/client/gfmeoasbp/commands');
  });
});
