import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path = '/') {
    return browser.get(path);
  }

  getEventPageHeaderTitle() {
    return element(by.css('app-root h1')).getText();
  }
}
