/* global afterEach, beforeEach, chai, describe, it */
'use strict';


var InteractiveMapModule = require('map/InteractiveMapModule');


var expect = chai.expect;


describe('map/InteractiveMapModule', function () {
  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof InteractiveMapModule).to.equal('function');
    });

    it('can be instantiated', function () {
      expect(InteractiveMapModule).to.not.throw(Error);
    });
  });

  describe('appendCloseButton', function () {
    it('should contain a close button', function () {
      var module;

      module = InteractiveMapModule();
      module.appendCloseButton();
      module.showMap(); // Need to show map so it's container is in DOM

      /* jshint -W030 */
      expect(document.querySelector('.modal-close')).to.not.be.null;
      /* jshint +W030 */

      module.destroy();
    });
  });


  describe('onCloseButtonClick', function () {
    it('should close the dialog', function () {
      var module;

      module = InteractiveMapModule();
      module.onCloseButtonClick();

      /* jshint -W030 */
      expect(document.querySelector('.modal-dialog')).to.be.null;
      /* jshint +W030 */

      module.destroy();
    });
  });

  describe('onContentClick', function () {
    var module;

    afterEach(function () {
      module.destroy();
    });

    beforeEach(function () {
      module = InteractiveMapModule();
    });

    it('should show map if button was clicked', function () {
      var button;

      button = document.createElement('button');
      button.classList.add('show-map');

      module.onContentClick({'target': button});

      /* jshint -W030 */
      expect(document.querySelector('.modal-dialog')).to.not.be.null;
      /* jshint +W030 */
    });

    it('should not show map if button was NOT clicked', function () {
      var button;

      button = document.createElement('button');

      module.onContentClick({'target': button});

      /* jshint -W030 */
      expect(document.querySelector('.modal-dialog')).to.be.null;
      /* jshint +W030 */
    });
  });

  describe.skip('onModalHide', function () {
    it('TODO :: Implement tests', function () {
      expect(false).to.equal(true);
    });
  });

  describe('render', function () {
    var module;

    afterEach(function () {
      module.destroy();
    });

    beforeEach(function () {
      module = InteractiveMapModule();
      module.render();
    });

    it('should put a link in the header', function () {
      /* jshint -W030 */
      expect(module.header.querySelector(
          '.back-to-summary-link')).to.not.be.null;
      /* jshint +W030 */
    });

    it('should put a button in the content area', function () {
      /* jshint -W030 */
      expect(module.content.querySelector(
          '.show-map')).to.not.be.null;
      /* jshint +W030 */
    });

    it('should empty the footer', function () {
      expect(module.footer.innerHTML).to.equal('');
    });
  });
});
