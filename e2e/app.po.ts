import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path = '/') {
    return browser.get(path);
  }

  getUnknownPageHeaderTitle () {
    return element(by.css('h1')).getText();
  }

  getEventPageHeaderTitle () {
    return element(by.css('event-page-header > header > h1')).getText();
  }
}
