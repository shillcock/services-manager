import { browser, ElementFinder, ExpectedConditions as EC } from 'protractor';

export function waitToBeVisible(element: ElementFinder, secondsToWait = 1) {
  return browser.wait(
    EC.visibilityOf(element),
    secondsToWait * 1000,
    `The element: ${element.locator()} did not appear within ${secondsToWait} seconds.`
  );
}

export function waitToBeInvisible(element: ElementFinder, secondsToWait = 1) {
  return browser.wait(
    EC.invisibilityOf(element),
    secondsToWait * 1000,
    `The element: ${element.locator()} did not disappear within ${secondsToWait} seconds.`
  );
}
