import { browser, by, element } from 'protractor';

export class AppPage {
  getMainPageHeaderTitle() {
    return element(by.css('main > header > h1')).getText();
  }

  getPageSectionTitle() {
    return element(by.css('.product-page-header > h3')).getText();
  }

  getUnknownPageHeaderTitle() {
    return element(by.css('h1')).getText();
  }

  navigateTo(path = '/') {
    return browser.get(path);
  }
}
