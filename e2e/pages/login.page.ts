import { browser, by, element } from 'protractor';

export class LoginPage {
  navigateToConsent() {
    return browser.get(`${browser.baseUrl}/consent?continueToUrl=/gfmui/`);
  }

  get consentToMonitorButton() {
    return element(by.buttonText('OK'));
  }

  get loginWithCacButton() {
    return element(by.buttonText('Continue'));
  }
}
