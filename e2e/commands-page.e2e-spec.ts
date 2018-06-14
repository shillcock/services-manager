import { browser } from 'protractor';

import { CommandsPage } from './pages/commands.page';
import { waitToBeInvisible, waitToBeVisible } from './helpers';
import * as fs from 'fs';

describe('Client commands page', () => {
  let page: CommandsPage;
  const clientId = 'eoas';

  beforeEach(() => {
    page = new CommandsPage(clientId);
  });

  function writeScreenShot(data: any, filename: string) {
    fs.writeFile(filename, data, 'base64', err => {
      if (err) {
        throw err;
      }
      console.log('File saved');
    });
  }

  it(`should display a list commands for "${clientId}"`, async () => {
    await page.navigateTo();
    const url = await browser.getCurrentUrl();
    expect(url).toContain(`/client/${clientId}/commands`);
    const commandCount = await page.getCommandElements().count();
    expect(commandCount).toBe(1);
  });

  it(`should submit ${clientId} "Status" command`, async () => {
    await page.navigateTo();
    const command = page.getCommandElement('Status');
    expect(await command.isPresent()).toBeTruthy();
    await command.click();
    const submitButton = page.getSubmitCommandButton();
    await waitToBeVisible(submitButton);
    await submitButton.click();
    const dialog = page.getDialog();
    await waitToBeVisible(dialog, 10);
    // const png = await browser.takeScreenshot();
    // writeScreenShot(png, 'dialog.png');
    await page.dismissDialog();
    await waitToBeInvisible(dialog);
  });
});
