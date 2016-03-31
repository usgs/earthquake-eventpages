/* global chai, describe, it, sinon */
'use strict';


var TextQuestionView = require('dyfi/TextQuestionView');


var expect = chai.expect;


describe('dyfi/TextQuestionView', function () {
  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof TextQuestionView).to.equal('function');
    });

    it('can be contructed', function () {
      expect(TextQuestionView).to.not.throw(Error);
    });

    it('can be destroyed', function () {
      var view;

      view = TextQuestionView();

      expect(view.destroy).to.not.throw(Error);
    });
  });

  describe('getAnswers', function () {
    it('Returns the appropriate answer', function() {
      var answer,
          view;

      view = TextQuestionView({
        label: 'A Label',
        value: 'A Value'
      });

      answer = view.getAnswers();

      expect(answer.label).to.equal('A Label');
      expect(answer.value).to.equal('A Value');

      view.destroy();
    });
  });

  describe('onChange', function () {
    it('triggers a change event', function () {
      var spy,
          view;

      view = TextQuestionView();
      spy = sinon.spy();
      view.on('change', spy);

      view.onChange();
      expect(spy.callCount).to.equal(1);

      view.destroy();
    });
  });

  describe('setAnswers', function() {
    it('changes the answer', function () {
      var answer,
          view;

      view = TextQuestionView({
        label: 'A Label',
        value: 'A Value'
      });

      view.setAnswers('New Value');
      answer = view.getAnswers();

      expect(answer.label).to.equal('A Label');
      expect(answer.value).to.equal('New Value');

      view.destroy();
    });
  });

});
