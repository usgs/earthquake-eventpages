/* global before, chai, describe, it, sinon */
'use strict';

var DYFIFormView = require('dyfi/DYFIFormView');


var expect = chai.expect;


describe('dyfi/DYFIFormView', function () {
  var view;

  describe('constructor', function () {
    it('should be defined', function () {
      expect(typeof DYFIFormView).to.equal('function');
    });

    it('can be constructed', function () {
      /* jshint -W030 */
      expect(DYFIFormView).to.not.be.null;
      /* jshint +W030 */
    });
  });

  describe('stripAnswer', function () {
    it('returns a striped Answer', function () {
      var answerObject,
          view;

      view = DYFIFormView();

      answerObject = view.stripAnswer('fldSituation_situation',
          {value: 'outside', label: 'Outside a building'});

      expect(answerObject.fldSituation_situation).to.equal('outside');
    });
  });

  // From here on all the tests need the form fully rendered, which requires
  //  an asynchronous call to finish first.
  before(function(done) {
    var createForm;

    view = DYFIFormView();
    createForm = view.createForm;
    sinon.stub(view, 'createForm', function() {
      createForm();
      done();
    });
    view.render();
  });

  describe('render', function () {
    it('shows the form by default', function () {
      expect(
          view.el.querySelector('.dyfi-contact-questions')).to.not.equal(null);
    });

    it('does not rerender the form when a question is included', function() {
      var spy;

      spy = sinon.spy(view, 'renderQuestions');
      view.render({fldSituation_situation: 'outside'});
      expect(spy.callCount).to.equal(0);
      spy.restore();
    });

    it('has questions', function() {
      expect(Object.keys(view.getQuestions()).length).to.be.above(0);
    });

    it('has required questions', function () {
      var questions;

      questions = view.getQuestions();
      expect(questions.ciim_mapLat).to.not.equal(undefined);
      expect(questions.ciim_mapLat).to.not.equal(undefined);
      expect(view.model.get('ciim_time') || questions.ciim_time).
          not.equal(null);
      expect(questions.fldSituation_felt.model).to.not.equal(undefined);
    });
  });

  describe('locationView', function() {
    it('has a location button', function () {
      var button;

      button = view.el.querySelector('.location-button');
      expect(button).to.not.equal(null);
    });

    it('locationCallback sets the alert', function (done) {
      var element,
          locationCallback;

      locationCallback = view.locationCallback;
      sinon.stub(view, 'locationCallback', function() {
        locationCallback({place: null,
          latitude: 36.13787471840729,
          longitude: -100.546875,
          confidence: 1,
          method: 'point'});
        done();
      });

      view.locationCallback();

      element = view.el.querySelector('.location-result');

      expect(element).to.not.equal(null);
    });
  });

  describe('updateModel', function() {

    it('update the model', function() {
      var questions;

      questions = view.getQuestions();

      questions.fldSituation_felt.setAnswers('1');
      view.updateModel(questions.fldSituation_felt);

      expect(view.model.get('fldSituation_felt')).to.equal('1');
    });

    it('updates the model when an answer is set', function () {
      var questions;

      questions = view.getQuestions();
      questions.fldSituation_felt.setAnswers('1');
      questions.fldSituation_felt.trigger('change',
          questions.fldSituation_felt);
      expect(view.model.get('fldSituation_felt')).to.equal('1');
    });

  });

  describe('destroy', function () {
    it('can be destroyed', function () {
      expect(view.destroy).to.not.throw(Error);
    });
  });

});
