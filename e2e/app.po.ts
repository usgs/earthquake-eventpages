import { browser, by, element } from 'protractor';

export class AppPage {
  getEventPageHeaderTitle() {
    return element(by.css('event-page-header > header > h1')).getText();
  }

  getUnknownPageHeaderTitle() {
    return element(by.css('h1')).getText();
  }

  navigateTo(path = '/') {
    return browser.get(path);
  }
}
