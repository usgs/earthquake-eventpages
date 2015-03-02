/* global chai, describe, it */
'use strict';

var expect = chai.expect,
    Tensor = require('scientific/tensor/Tensor');


var compareNodalPlans = function (np1, np2) {
  return (
    Math.round(np1.strike) === Math.round(np2.strike) &&
    Math.round(np1.dip) === Math.round(np2.dip) &&
    Math.round(np1.rake) === Math.round(np2.rake)
  );
};


describe('Tensor test suite.', function () {
  describe('Constructor', function () {
    it('Can be defined.', function () {
      /* jshint -W030 */
      expect(Tensor).not.to.be.undefined;
      /* jshint +W030 */
    });

    it('Can be instantiated', function () {
      var c = new Tensor();
      expect(c).to.be.an.instanceof(Tensor);
    });
  });

  describe('usb000s65z test', function () {
    var parameters = {
      mpp: 65700000000000000,
      mrp: -47800000000000000,
      mrr: -142800000000000000,
      mrt: -17200000000000000,
      mtp: 600000000000000,
      mtt: 77100000000000000
    };

    var tensor = new Tensor(parameters);

    it('computes Moment correctly', function () {
      // moment ~ 133818571207437400
      expect(tensor.moment).to.be.closeTo(1.338E17, 1E14);
    });

    it('computes Magnitude correctly', function () {
      // magnitude ~ 5.351010925712054
      expect(Math.round(tensor.magnitude * 100) / 100).to.equal(5.35);
    });

    it('computes %DC correctly', function () {
      // percentDC ~ 0.05671996102848276 so should round to 0.06.
      expect(Math.round(tensor.percentDC * 100) / 100).to.equal(0.06);
    });

    it('computes Nodal Planes correctly', function () {
      /* jshint -W030 */
      expect(compareNodalPlans(tensor.NP1,
          {strike:242,dip:35,rake:-77})).to.be.true;
      expect(compareNodalPlans(tensor.NP2,
          {strike:47,dip:56,rake:-99})).to.be.true;
      /* jshint +W030 */
    });

    it('computes Axes correctly', function () {
      expect(tensor.N.value).to.be.closeTo(0.728E17, 1E14);
      expect(tensor.T.value).to.be.closeTo(0.815E17, 1E14);
      expect(tensor.P.value).to.be.closeTo(-1.544E17, 1E14);
    });
  });
});
