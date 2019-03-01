import { browser, by, element } from 'protractor';

export class AppPage {
  // Includes these product types:
  // - dyfi
  // - finite-fault
  // - general-link
  // - general-text
  // - geoserve
  // - ground-failure
  // - impact-link
  // - impact-text
  // - losspager
  // - moment-tensor
  // - oaf
  // - origin
  // - phase-data
  // - poster
  // - scitech-link
  // - shakemap
  EVENT_ID_1 = 'ak20419010';

  // Includes these product types
  // - dyfi
  // - focal-mechanism             <-- Notable
  // - geoserve
  // - nearby-cities               <-- Notable
  // - origin
  // - phase-data
  // - shakemap
  EVENT_ID_2 = 'ci38474368';

  getMainPageHeaderTitle() {
    return this.select('main > header > h1').getText();
  }

  getPageSectionTitle() {
    return this.select('.product-page-header > h2').getText();
  }

  getUnknownPageHeaderTitle() {
    return this.select('h1').getText();
  }

  navigateTo(path = '/') {
    return browser.get(path);
  }

  select(selector: string) {
    return element(by.css(selector));
  }
}
