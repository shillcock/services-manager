import { browser } from 'protractor';

import { CommandsPage } from './pages/commands.page';
import { waitToBeInvisible, waitToBeVisible } from './helpers';

describe('Client commands page', () => {
  let page: CommandsPage;
  const clientId = 'gfmeoas';

  beforeEach(() => {
    page = new CommandsPage(clientId);
  });

  it(`should display a list commands for "${clientId}"`, async () => {
    await page.navigateTo();
    const url = await browser.getCurrentUrl();
    expect(url).toContain(`/client/${clientId}/commands`);
    const commandCount = await page.commandElements.count();
    expect(commandCount).toBeGreaterThan(0);
  });

  it(`should submit ${clientId} "Status" command`, async () => {
    await page.navigateTo();
    const command = page.getCommandElement('Status');
    expect(await command.isPresent()).toBeTruthy();
    await command.click();
    await waitToBeVisible(page.submitCommandButton);
    await page.submitCommandButton.click();
    await waitToBeVisible(page.dialog, 10);
    await page.dismissDialog();
    await waitToBeInvisible(page.dialog);
  });
});
