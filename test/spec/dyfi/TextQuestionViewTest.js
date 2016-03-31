/* global chai, describe, it, sinon */
'use strict';

var TextQuestionView = require('dyfi/TextQuestionView');

var expect = chai.expect;

var getChangeEvent = function () {
  var evt = document.createEvent('HTMLEvents');
  evt.initEvent('change', false, true);
  return evt;
};

describe('dyfi/TextQuestionView', function () {
  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof TextQuestionView).to.equal('function');
    });

    it('can be contructed', function () {
      /* jshint -W030 */
      expect(TextQuestionView).to.not.be.null;
      /* jshint +W030 */
    });
    it('Has proper default attributes.', function () {
      /* jshint -W030 */
      expect(TextQuestionView.el).to.not.be.null;
      expect(TextQuestionView.label).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('_onChange()', function () {
    var spy = sinon.spy();
    it('returns value', function () {
      var question = TextQuestionView({
        label:'This label'
      });

    var el = question.el,
        inputs = el.getElementsByTagName('input');

    question.on('change', spy);

    inputs[0].value ='dont say anything';
    inputs[0].dispatchEvent(getChangeEvent());
    expect(spy.callCount).to.equal(1);
    });
  });

  describe('getAnswers', function () {
    var question = TextQuestionView({
      label:'This label',
      value:'Set'
    });

    it('Returns the appropriate answer', function() {
      expect(question.getAnswers().value).to.equal('Set');
    });
  });

  describe('setAnswers()', function() {
    var question = TextQuestionView({
      label:'This label'
    });
    /* jshint -W030 */
    expect(question.getAnswers().value).to.equal('');
    question.setAnswers('set');
    expect(question.getAnswers().value).to.equal('set');
    /* jshint +W030 */
  });

});
