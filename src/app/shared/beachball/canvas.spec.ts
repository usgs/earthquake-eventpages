import { Canvas } from './canvas';

describe('Canvas', () => {
  const testCanvas = new Canvas();
  testCanvas.context = {calls: []};
  [
    'arc',
    'beginPath',
    'closePath',
    'fill',
    'fillText',
    'lineTo',
    'moveTo',
    'measureText',
    'stroke',
    'strokeText'
  ].forEach((name) => {
    testCanvas.context[name] = function () {
      testCanvas.context.calls.push({
        name: name,
        arguments: Array.prototype.slice.call(arguments)
      });
    };
  });

  beforeEach(() => {
    testCanvas.context.calls = [];
    testCanvas.context.fillStyle = null;
    testCanvas.context.font = null;
    testCanvas.context.strokeStyle = null;
    spyOn(testCanvas, '_strokeAndFill').and.returnValue(false);
  });

  describe('constructor', () => {
    it('creates canvas if not provided', () => {
      const canvas = new Canvas();
      expect(canvas.canvas).toBeTruthy();
    });

    it('uses provided canvas', () => {
      const el = document.createElement('canvas');
      el.height = 200;
      el.width = 200;
      const canvas = new Canvas(el, 300, 300);
      expect(canvas.canvas).toBe(el);
      expect(canvas.height).toBe(300);
      expect(canvas.width).toBe(300);
    });
  });

  describe('clear', () => {
    it('uses clearRect when defined', () => {
      const canvas = new Canvas();
      canvas.width = 123;
      canvas.height = 456;
      spyOn(canvas.context, 'clearRect').and.returnValue(false);
      canvas.clear();
      expect(canvas.context.clearRect).toHaveBeenCalledWith(0, 0, 123, 456);
    });

    it('resets width property when clearRect not defined', () => {
      const canvas = new Canvas();

      const getSpy = jasmine.createSpy('width get').and.returnValue('test get');
      const setSpy = jasmine.createSpy('width set').and.returnValue('test set');
      const TestCanvas = class {
        get width() {
          return getSpy();
        }
        set width(width: any) {
          setSpy(width);
        }
      };
      canvas.canvas = new TestCanvas();
      canvas.context = {};
      canvas.clear();

      expect(getSpy).toHaveBeenCalled();
      expect(setSpy).toHaveBeenCalledWith('test get');
    });
  });

  describe('circle', () => {
    it('draws a circle', () => {
      testCanvas.circle(1, 2, 3, 'stroke', 'fill');
      expect(testCanvas.context.calls).toEqual([
        {name: 'beginPath', arguments: []},
        {name: 'arc', arguments: [1, 2, 1.5, 0, Math.PI * 2, true]},
        {name: 'closePath', arguments: []}
      ]);
      expect(testCanvas._strokeAndFill).toHaveBeenCalledWith('stroke', 'fill');
    });
  });

  describe('polygon', () => {
    it('draws a polygon', () => {
      testCanvas.polygon(
        ['x1', 'x2', 'x3'],
        ['y1', 'y2', 'y3'],
        'stroke',
        'fill'
      );
      expect(testCanvas.context.calls).toEqual([
        {name: 'beginPath', arguments: []},
        {name: 'moveTo', arguments: ['x1', 'y1']},
        {name: 'lineTo', arguments: ['x2', 'y2']},
        {name: 'lineTo', arguments: ['x3', 'y3']},
        {name: 'closePath', arguments: []}
      ]);
      expect(testCanvas._strokeAndFill).toHaveBeenCalledWith('stroke', 'fill');
    });
  });

  describe('line', () => {
    it('draws a line', () => {
      testCanvas.line(
        ['x1', 'x2', 'x3'],
        ['y1', 'y2', 'y3'],
        'stroke',
        'fill'
      );
      expect(testCanvas.context.calls).toEqual([
        {name: 'beginPath', arguments: []},
        {name: 'moveTo', arguments: ['x1', 'y1']},
        {name: 'lineTo', arguments: ['x2', 'y2']},
        {name: 'lineTo', arguments: ['x3', 'y3']}
      ]);
      expect(testCanvas._strokeAndFill).toHaveBeenCalledWith('stroke', 'fill');
    });
  });

  describe('measureText', () => {
    it('measures text', () => {
      testCanvas.measureText('font', 'test text');
      expect(testCanvas.context.font).toBe('font');
      expect(testCanvas.context.calls).toEqual([
        {name: 'measureText', arguments: ['test text']}
      ]);
    });
  });

  describe('text', () => {
    it('draws text', () => {
      testCanvas.text('test text', 'font', 50, 75, 'stroke', 'fill');
      expect(testCanvas.context.font).toBe('font');
      expect(testCanvas.context.strokeStyle).toBe('stroke');
      expect(testCanvas.context.fillStyle).toBe('fill');
      expect(testCanvas.context.calls).toEqual([
        {name: 'strokeText', arguments: ['test text', 50, 75]},
        {name: 'fillText', arguments: ['test text', 50, 75]}
      ]);
    });

    it('aligns center', () => {
      spyOn(testCanvas.context, 'measureText').and.returnValue({width: 50});
      testCanvas.text('test text', 'font', 50, 75, 'stroke', 'fill', 'center');
      expect(testCanvas.context.measureText).toHaveBeenCalledWith('test text');
      expect(testCanvas.context.calls).toEqual([
        {name: 'strokeText', arguments: ['test text', 25, 75]},
        {name: 'fillText', arguments: ['test text', 25, 75]}
      ]);
    });

    it('aligns right', () => {
      spyOn(testCanvas.context, 'measureText').and.returnValue({width: 10});
      testCanvas.text('test text', 'font', 50, 75, 'stroke', 'fill', 'right');
      expect(testCanvas.context.measureText).toHaveBeenCalledWith('test text');
      expect(testCanvas.context.calls).toEqual([
        {name: 'strokeText', arguments: ['test text', 40, 75]},
        {name: 'fillText', arguments: ['test text', 40, 75]}
      ]);
    });

    it('skips fill when falsy', () => {
      testCanvas.text('test text', 'font', 50, 75, 'stroke', null);
      expect(testCanvas.context.calls).toEqual([
        {name: 'strokeText', arguments: ['test text', 50, 75]},
      ]);
    });

    it('skips stroke when falsy', () => {
      testCanvas.text('test text', 'font', 50, 75, null, 'fill');
      expect(testCanvas.context.calls).toEqual([
        {name: 'fillText', arguments: ['test text', 50, 75]},
      ]);
    });
  });

  describe('_strokeAndFill', () => {
    it('strokes and fills', () => {
      // canvas without _strokeAndFill spy
      const canvas = new Canvas();
      canvas.context = testCanvas.context;

      canvas._strokeAndFill('stroke', 'fill');
      expect(canvas.context.strokeStyle).toBe('stroke');
      expect(canvas.context.fillStyle).toBe('fill');
      expect(canvas.context.calls).toEqual([
        {name: 'stroke', arguments: []},
        {name: 'fill', arguments: []}
      ]);
    });

    it('skips stroke when falsy', () => {
      // canvas without _strokeAndFill spy
      const canvas = new Canvas();
      canvas.context = testCanvas.context;

      canvas._strokeAndFill(null, 'fill');
      expect(canvas.context.strokeStyle).toBeNull();
      expect(canvas.context.fillStyle).toBe('fill');
      expect(canvas.context.calls).toEqual([
        {name: 'fill', arguments: []}
      ]);
    });

    it('skips fill when falsy', () => {
      // canvas without _strokeAndFill spy
      const canvas = new Canvas();
      canvas.context = testCanvas.context;

      canvas._strokeAndFill('stroke', null);
      expect(canvas.context.strokeStyle).toBe('stroke');
      expect(canvas.context.fillStyle).toBeNull();
      expect(canvas.context.calls).toEqual([
        {name: 'stroke', arguments: []}
      ]);
    });

  });
});
