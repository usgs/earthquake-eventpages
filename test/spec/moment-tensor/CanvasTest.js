/* global chai, describe, it */
'use strict';

var Canvas = require('moment-tensor/Canvas');


var expect = chai.expect;


describe('moment-tensor/Canvas', function () {

  describe('constructor', function () {

    it('is a function', function () {
      expect(typeof Canvas).to.equal('function');
    });

    it('creates a canvas using width and height', function () {
      var c,
          height,
          width;

      height = 123;
      width = 456;
      c = Canvas({
        height: height,
        width: width
      });
      expect(c.canvas.height).to.equal(height);
      expect(c.canvas.width).to.equal(width);
      c.destroy();
    });

    it('uses configured canvas', function () {
      var c,
          canvas,
          context;

      context = {};
      canvas = {
        getContext: function () {
          return context;
        }
      };

      c = Canvas({
        canvas: canvas
      });
      expect(c.canvas).to.equal(canvas);
      expect(c.context).to.equal(context);
      c.destroy();
    });
  });

  describe('destroy', function () {
    it('exists', function () {
      var c;

      c = Canvas();
      expect(typeof c.destroy).to.equal('function');
      c.destroy();
    });
  });

});
