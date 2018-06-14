import { browser, by, element, ExpectedConditions as EC } from 'protractor';

export class CommandsPage {
  constructor(public clientId: string) {}

  navigateTo() {
    return browser.get(`${browser.baseUrl}/#/client/${this.clientId}/commands`);
  }

  getCommandElements() {
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

  getSubmitCommandButton() {
    // await borwser.wait(EC.presenceOf(button), 2000);
    return element(by.buttonText('Submit Command'));
  }

  getDialog() {
    return element(by.tagName('mat-dialog-container'));
  }

  dismissDialog() {
    return element(by.buttonText('Done')).click();
  }
}
