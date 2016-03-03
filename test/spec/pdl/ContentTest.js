/* global chai, describe, it */
'use strict';


var Content = require('pdl/Content');

var expect = chai.expect;


describe('pdl/Content', function () {

  describe('constructor', function () {
    it('is defined', function () {
      expect(typeof Content).to.equal('function');
    });

    it('requires a bytes or url property', function () {
      expect(Content).to.throw(Error);

      expect(function () {
        Content({
          'url': 'abc'
        });
      }).to.not.throw(Error);

      expect(function () {
        Content({
          'bytes': 'abc'
        });
      }).to.not.throw(Error);
    });
  });

  describe('set', function () {
    it('clears bytes when url is set', function () {
      var content;

      content = Content({
        'bytes': 'abc'
      });
      content.set({'url': 'abc'});
      expect(content.get('bytes')).to.equal(null);
    });

    it('clears url when bytes is set', function () {
      var content;

      content = Content({
        'url': 'abc'
      });
      content.set({'bytes': 'abc'});
      expect(content.get('url')).to.equal(null);
    });
  });

  describe('validate', function () {
    it('throws Error when missing id', function () {
      var content;

      content = Content({
        'bytes': 'abc'
      });
      expect(content.validate).to.throw(Error);
    });

    it('does not throw Error when valid', function () {
      var content;

      content = Content({
        'id': 'abc',
        'bytes': 'def'
      });
      expect(content.validate).to.not.throw(Error);
      content.set({'url': 'def'});
      expect(content.validate).to.not.throw(Error);
    });
  });

});
