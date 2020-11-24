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

  // EVENT_ID_1 used to include "oaf" product,
  // but was removed.  Newer event that includes oaf.
  // - oaf
  EVENT_ID_3 = 'us7000asvb';

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
