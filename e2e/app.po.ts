import { browser, by, element } from 'protractor';

export class AppPage {
  getMainPageHeaderTitle() {
    return element(by.css('main > header > h1')).getText();
  }

  getUnknownPageHeaderTitle() {
    return element(by.css('h1')).getText();
  }

  navigateTo(path = '/') {
    return browser.get(path);
  }
}
