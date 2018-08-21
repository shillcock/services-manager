import { browser, by, element } from 'protractor';

export class CommandsPage {
  constructor(public clientId: string) {}

  navigateTo() {
    return browser.get(`${browser.baseUrl}/#/client/${this.clientId}/commands`);
  }

  get commandElements() {
    return element.all(by.tagName('sm-command-list mat-expansion-panel'));
  }

  getCommandElement(commandLabel: string) {
    return element(
      by.cssContainingText(
        'sm-command-list mat-expansion-panel mat-panel-title',
        commandLabel
      )
    );
  }

  get submitCommandButton() {
    return element(by.buttonText('Submit Command'));
  }

  get dialog() {
    return element(by.tagName('mat-dialog-container'));
  }

  dismissDialog() {
    return element(by.buttonText('Done')).click();
  }
}
