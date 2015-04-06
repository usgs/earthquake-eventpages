/* global chai, describe, it */
'use strict';

var expect = chai.expect,
    ScientificSummaryPage = require('scientific/ScientificSummaryPage'),
    ScientificModule = require('scientific/ScientificModule'),
    nc72119972 = require('./nc72119972'),
    options,
    page;


options = {
  eventDetails: nc72119972,
  module: new ScientificModule({
    eventDetails:nc72119972
  }),
  productTypes: ['scitech-text'],
  title: 'products',
  hash: 'scitech-text'
};
page = new ScientificSummaryPage(options);


describe('Scientific Summary Page', function () {

  describe('Constructor', function () {
    it('Can be defined.', function () {
      /* jshint -W030 */
      expect(page).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be instantiated', function () {
      expect(page).to.be.an.instanceof(ScientificSummaryPage);
    });
  });

  describe('Check for scientific and technical commentary', function () {
    it('has scitech-text', function () {
      var el = page._content.querySelector('.scitech-text');

      expect(el).to.not.equal(null);
      expect(el.querySelector('section').innerHTML).to.equal(
          nc72119972.properties.products['scitech-text'][0].contents[''].bytes);
    });
  });

});
