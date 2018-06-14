import { LandingPage } from './pages/landing.page';
import { browser } from 'protractor';

describe('Services Manager index view', () => {
  let page: LandingPage;

  beforeEach(() => {
    page = new LandingPage();
  });

  it('should display a list of 4 clients', async () => {
    await page.navigateTo();
    const clientCount = await page.getClientPreviewCardElements().count();
    expect(clientCount).toBe(4);
  });

  it('should navigate to "EOAS BP" client page when card is clicked', async () => {
    await page.navigateTo();
    const client = await page.getClientPreviewCardElement('EOAS BP');
    expect(client).toBeTruthy();
    await client.click();
    const clientUrl = await browser.getCurrentUrl();
    expect(clientUrl).toContain('/client/eoasbp/commands');
  });
});
