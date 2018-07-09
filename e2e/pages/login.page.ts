import { browser, by, element } from 'protractor';

export class LoginPage {
  
  navigateToConsent() {
    return browser.get(`${browser.baseUrl}/consent?continueToUrl=/gfmui/`);
  }
  
  getConsentToMonitorButton() {
    return element(by.buttonText('OK'));
  }
  
  getLoginWithCacButton() {
    return element(by.buttonText('Continue'));
  }
  
}