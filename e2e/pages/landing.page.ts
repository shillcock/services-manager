import { browser, by, element } from 'protractor';

export class LandingPage {
  navigateTo() {
    return browser.get(`${browser.baseUrl}/#/`);
  }

  get clientPreviewCardElements() {
    return element.all(by.tagName('sm-client-preview'));
  }

  getClientPreviewCardElement(clientLabel: string) {
    return element(
      by.cssContainingText('sm-client-preview mat-card-title', clientLabel)
    );
  }
}
