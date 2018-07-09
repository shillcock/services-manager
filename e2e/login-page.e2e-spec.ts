import { LoginPage } from './pages/login.page';
import { browser } from 'protractor';
import { waitToBeVisible } from './helpers';

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
    let loginPage = new LoginPage();
    // Navigate to Consent to Monitor Page
    await loginPage.navigateToConsent();    
    let url = await browser.getCurrentUrl();
    expect(url).toContain('consent?continueToUrl=/gfmui/'); 
    // CLick OK button to go to logon page   
    const consentToMonitorButton = loginPage.getConsentToMonitorButton();
    await waitToBeVisible(consentToMonitorButton);
    await consentToMonitorButton.click();     
    url = await browser.getCurrentUrl();
    expect(url).toContain('logon?continueToUrl=/gfmui/');
    // Click to login with CAC
    const loginWithCacButton = loginPage.getLoginWithCacButton();
    await waitToBeVisible(loginWithCacButton);
    await loginWithCacButton.click();       
    url = await browser.getCurrentUrl();
    expect(url).toContain('gfmui/#/');    
  });

});
