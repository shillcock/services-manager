import { LoginPage } from './pages/login.page';
import { browser } from 'protractor';
// import { waitToBeVisible } from './helpers';

describe('ASIS login', () => {
  let page: LoginPage;

  beforeAll(() => {
    browser.waitForAngularEnabled(false);
  });

  beforeEach(() => {
    page = new LoginPage();
  });

  afterAll(() => {
    browser.waitForAngularEnabled(true);
  });

  it('should get passed ASIS', async () => {
    const loginPage = new LoginPage();

    await loginPage.navigateToConsent();
    let url = await browser.getCurrentUrl();
    expect(url).toContain('consent?continueToUrl=/gfmui/');

    // await waitToBeVisible(loginPage.consentToMonitorButton);
    await loginPage.consentToMonitorButton.click();

    url = await browser.getCurrentUrl();
    expect(url).toContain('logon?continueToUrl=/gfmui/');

    // await waitToBeVisible(loginPage.loginWithCacButton);
    await loginPage.loginWithCacButton.click();

    url = await browser.getCurrentUrl();
    expect(url).toContain('/gfmui/#/');
  });
});
