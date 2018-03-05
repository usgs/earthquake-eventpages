import { Beachball } from './beachball';
import { Canvas } from './canvas';
import { Tensor } from './tensor';


describe('Beachball', () => {
  const testCanvas = {
    calls: [],
    canvas: document.createElement('canvas'),
    context: {}
  };

  [
    'circle',
    'line',
    'polygon',
    'text'
  ].forEach((name) => {
    testCanvas[name] = function () {
      testCanvas.calls.push({
        name: name,
        arguments: Array.prototype.slice.call(arguments)
      });
    };
  });

  beforeEach(() => {
    testCanvas.calls = [];
    testCanvas.context = {};
  });

  describe('render', () => {
    const tensor = Tensor.fromProduct({
      id: 'urn:usgs-product:us:moment-tensor:us_2000cjfy_mww:1519977554040',
      type: 'moment-tensor',
      properties: {
        'tensor-mpp': '-2.3267E+19',
        'tensor-mrp': '-7.68E+18',
        'tensor-mrr': '5.3766E+19',
        'tensor-mrt': '1.0445E+19',
        'tensor-mtp': '3.4237E+19',
        'tensor-mtt': '-3.0499E+19'
      }
    });

    it('renders', () => {
      const options = {
        bgColor: '#fff',
        fillColor: '#ddd',
        labelPlanesFont: '14px Arial',
        lineColor: '#000'
      };
      const beachball = new Beachball(tensor, document.createElement('div'), options);
      spyOn(beachball, 'createCanvas').and.returnValue(testCanvas);
      beachball.render();

      // fill fill color (center is filled)
      const call0 = testCanvas.calls[0];
      expect(call0.name).toEqual('circle');
      expect(call0.arguments[2]).toEqual(198);
      expect(call0.arguments[3]).toEqual(options.lineColor);
      expect(call0.arguments[4]).toEqual(options.fillColor);

      // plot first "empty" polygon
      const call1 = testCanvas.calls[1];
      expect(call1.name).toEqual('polygon');
      expect(call1.arguments[0].length).toEqual(call1.arguments[1].length);
      expect(call1.arguments[2]).toEqual(options.lineColor);
      expect(call1.arguments[3]).toEqual(options.bgColor);

      // plot second "empty" polygon
      const call2 = testCanvas.calls[2];
      expect(call2.name).toEqual('polygon');
      expect(call2.arguments[0].length).toEqual(call2.arguments[1].length);
      expect(call2.arguments[2]).toEqual(options.lineColor);
      expect(call2.arguments[3]).toEqual(options.bgColor);

      // plot first nodal plane line
      const call3 = testCanvas.calls[3];
      expect(call3.name).toEqual('line');
      expect(call3.arguments[0].length).toEqual(call3.arguments[1].length);
      expect(call3.arguments[2]).toEqual(options.lineColor);
      expect(call3.arguments[3]).toBeNull();

      const call4 = testCanvas.calls[4];
      expect(call4.name).toEqual('line');
      expect(call4.arguments[0].length).toEqual(call4.arguments[1].length);
      expect(call4.arguments[2]).toEqual(options.lineColor);
      expect(call4.arguments[3]).toBeNull();

      // re-plot outline to clean up rough edges
      const call5 = testCanvas.calls[5];
      expect(call5.name).toEqual('circle');
      expect(call5.arguments[2]).toEqual(198);
      expect(call5.arguments[3]).toEqual(options.lineColor);
      expect(call5.arguments[4]).toBeNull();


      const call6 = testCanvas.calls[6];
      expect(call6.name).toEqual('text');
      expect(call6.arguments[0]).toEqual('P');
      expect(call6.arguments[4]).toBeNull();
      expect(call6.arguments[5]).toEqual('black');
      expect(call6.arguments[6]).toEqual('center');

      const call7 = testCanvas.calls[7];
      expect(call7.name).toEqual('text');
      expect(call7.arguments[0]).toEqual('T');
      expect(call7.arguments[4]).toBeNull();
      expect(call7.arguments[5]).toEqual('black');
      expect(call7.arguments[6]).toEqual('center');

      // call 8 is tick mark for first plane label
      const call9 = testCanvas.calls[9];
      expect(call9.name).toEqual('text');
      expect(call9.arguments[0]).toEqual('(314, 39, 92)');
      expect(call9.arguments[1]).toEqual(options.labelPlanesFont);

      // call 10 is tick mark for second plane label
      const call11 = testCanvas.calls[11];
      expect(call11.name).toEqual('text');
      expect(call11.arguments[0]).toEqual('(130, 51, 88)');
      expect(call11.arguments[1]).toEqual(options.labelPlanesFont);
    });


    it('plots axes', () => {
      const options = {
        bgColor: '#fff',
        fillColor: '#ddd',
        labelPlanesFont: '14px Arial',
        lineColor: '#000',
        labelAxes: false,
        plotAxes: true,
        plotPlanes: false
      };
      const beachball = new Beachball(tensor, document.createElement('div'), options);
      spyOn(beachball, 'createCanvas').and.returnValue(testCanvas);
      beachball.render();

      // fill fill color (center is filled)
      const call0 = testCanvas.calls[0];
      expect(call0.name).toEqual('circle');
      expect(call0.arguments[2]).toEqual(198);
      expect(call0.arguments[3]).toEqual(options.lineColor);
      expect(call0.arguments[4]).toEqual(options.fillColor);

      // plot first "empty" polygon
      const call1 = testCanvas.calls[1];
      expect(call1.name).toEqual('polygon');
      expect(call1.arguments[0].length).toEqual(call1.arguments[1].length);
      expect(call1.arguments[2]).toEqual(options.lineColor);
      expect(call1.arguments[3]).toEqual(options.bgColor);

      // plot second "empty" polygon
      const call2 = testCanvas.calls[2];
      expect(call2.name).toEqual('polygon');
      expect(call2.arguments[0].length).toEqual(call2.arguments[1].length);
      expect(call2.arguments[2]).toEqual(options.lineColor);
      expect(call2.arguments[3]).toEqual(options.bgColor);

      // re-plot outline to clean up rough edges
      const call3 = testCanvas.calls[3];
      expect(call3.name).toEqual('circle');
      expect(call3.arguments[2]).toEqual(198);
      expect(call3.arguments[3]).toEqual(options.lineColor);
      expect(call3.arguments[4]).toBeNull();

      // plot axes as circles
      const call4 = testCanvas.calls[4];
      expect(call4.name).toEqual('circle');
      expect(call4.arguments[3]).toEqual('white');
      expect(call4.arguments[4]).toEqual('black');

      const call5 = testCanvas.calls[5];
      expect(call5.name).toEqual('circle');
      expect(call5.arguments[3]).toEqual('black');
      expect(call5.arguments[4]).toEqual('white');
    });

    it('renders small', () => {
      const options = {
        bgColor: '#fff',
        fillColor: '#6ea8ff',
        labelPlanesFont: '14px Arial',
        lineColor: '#000',
        labelAxes: false,
        labelPlanes: false,
        size: 30
      };
      const beachball = new Beachball(tensor, document.createElement('div'), options);
      spyOn(beachball, 'createCanvas').and.returnValue(testCanvas);
      beachball.render();

      // fill fill color (center is filled)
      const call0 = testCanvas.calls[0];
      expect(call0).toEqual({
        name: 'circle',
        arguments: [
          15,
          15,
          28,
          options.lineColor,
          options.fillColor
        ]
      });

      // plot first "empty" polygon
      const call1 = testCanvas.calls[1];
      expect(call1.name).toEqual('polygon');
      expect(call1.arguments[0].length).toEqual(call1.arguments[1].length);
      expect(call1.arguments[2]).toEqual(options.lineColor);
      expect(call1.arguments[3]).toEqual(options.bgColor);

      // plot second "empty" polygon
      const call2 = testCanvas.calls[2];
      expect(call2.name).toEqual('polygon');
      expect(call2.arguments[0].length).toEqual(call2.arguments[1].length);
      expect(call2.arguments[2]).toEqual(options.lineColor);
      expect(call2.arguments[3]).toEqual(options.bgColor);

      // plot first nodal plane line
      const call3 = testCanvas.calls[3];
      expect(call3.name).toEqual('line');
      expect(call3.arguments[0].length).toEqual(call3.arguments[1].length);
      expect(call3.arguments[2]).toEqual(options.lineColor);
      expect(call3.arguments[3]).toBeNull();

      const call4 = testCanvas.calls[4];
      expect(call4.name).toEqual('line');
      expect(call4.arguments[0].length).toEqual(call4.arguments[1].length);
      expect(call4.arguments[2]).toEqual(options.lineColor);
      expect(call4.arguments[3]).toBeNull();

      // re-plot outline to clean up rough edges
      const call5 = testCanvas.calls[5];
      expect(call5).toEqual({
        name: 'circle',
        arguments: [
          15,
          15,
          28,
          options.lineColor,
          null
        ]
      });
    });

    it('swaps colors when center is "empty"', () => {
      const tensor2 = Tensor.fromProduct({
        id: 'urn:usgs-product:us:moment-tensor:us_1000ay3r_mww:1516225837040',
        type: 'moment-tensor',
        properties: {
          depth: '11.5',
          'tensor-mpp': '1.0477E+17',
          'tensor-mrp': '1.2565E+17',
          'tensor-mrr': '-8.0046E+17',
          'tensor-mrt': '4.1298E+17',
          'tensor-mtp': '2.334E+16',
          'tensor-mtt': '6.9568E+17'
        }
      });

      const options = {
        bgColor: '#fff',
        fillColor: '#6ea8ff',
        labelPlanesFont: '14px Arial',
        lineColor: '#000',
        labelAxes: false,
        labelPlanes: false,
        size: 30
      };
      const beachball = new Beachball(tensor2, document.createElement('div'), options);
      spyOn(beachball, 'createCanvas').and.returnValue(testCanvas);
      beachball.render();

      expect(beachball.bgColor).toEqual(options.fillColor);
      expect(beachball.fillColor).toEqual(options.bgColor);
    });
  });
});
