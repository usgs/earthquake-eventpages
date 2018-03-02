import { Vector } from './vector';


function vectorClose(v1, v2) {
  if (!v1 || !v2) {
    if (!v1 && !v2) {
      return true;
    }
    return false;
  }
  if (v1.data.length !== v2.data.length) {
    return false;
  }
  for (let i = 0; i < v1.data.length; i++) {
    if (Math.abs(v1.data[i] - v2.data[i]) > 0.00001) {
      return false;
    }
  }
  return true;
}

describe('Vector', () => {

  describe('add', () => {
    it('adds', () => {
      expect(new Vector([1, 2, 3]).add([1, 2, 3])).toEqual(new Vector([2, 4, 6]));
    });

    it('throws error when different sizes', () => {
      expect(() => {
        new Vector([1, 2, 3]).add([1, 2]);
      }).toThrowError();
    });
  });

  describe('angle', () => {
    it('calculates angles', () => {
      expect(new Vector([0, 1]).angle([1, 0])).toEqual(90 * Math.PI / 180);
      expect(new Vector([0, 1]).angle(new Vector([0, -1]))).toEqual(180 * Math.PI / 180);
    });
  });

  describe('azimuth', () => {
    it ('calculates azimuth', () => {
      expect(new Vector([0, 0]).azimuth()).toEqual(0);
      expect(new Vector([0, 1]).azimuth()).toEqual(0);
      expect(new Vector([1, 1]).azimuth()).toEqual(45 * Math.PI / 180);
      expect(new Vector([1, 0]).azimuth()).toEqual(90 * Math.PI / 180);
      expect(new Vector([1, -1]).azimuth()).toEqual(135 * Math.PI / 180);
      expect(new Vector([-1, -1]).azimuth()).toEqual(225 * Math.PI / 180);
      expect(new Vector([-1, 1]).azimuth()).toEqual(-45 * Math.PI / 180);
    });

    it('throws error for 1-d vectors', () => {
      expect(() => {
        new Vector([1]).azimuth();
      }).toThrowError();
    });
  });


  describe('cross', () => {
    it ('calculates cross product', () => {
      expect(new Vector([0, 1, 0]).cross([1, 0, 0])).toEqual(new Vector([0, 0, -1]));
      expect(new Vector([1, 0, 0]).cross([0, 1, 0])).toEqual(new Vector([0, 0, 1]));
    });

    it('throws error for unequal and <3d vectors', () => {
      expect(() => {
        new Vector([1, 2, 3]).cross(new Vector([1, 2]));
      }).toThrowError();
      expect(() => {
        new Vector([1, 2]).cross(new Vector([1, 2]));
      }).toThrowError();
    });
  });

  describe('dot', () => {
    it('computes dot product', () => {
      expect(new Vector([0, 1, 2]).dot([1, 2, 3])).toEqual(8);
      expect(new Vector([2, 1, 2]).dot(new Vector([1, 2, 3]))).toEqual(10);
    });
  });

  describe('equals', () => {
    it ('returns false when lengths differ', () => {
      expect(new Vector([0, 1, 0]).equals(new Vector([0, 1]))).toEqual(false);
    });
    it ('compares values', () => {
      expect(new Vector([0, 1]).equals([0, 1])).toEqual(true);
      expect(new Vector([0, 1]).equals([0, 1.1])).toEqual(false);
    });
  });

  describe('magnitude', () => {
    it('computes magnitude', () => {
      expect(new Vector([1, 0]).magnitude()).toEqual(1);
      expect(new Vector([1, 1]).magnitude()).toEqual(Math.SQRT2);
    });
  });

  describe('plunge', () => {
    it ('requires 3 dimensions', () => {
      expect(() => {
        new Vector([1, 2]).plunge();
      }).toThrowError();
    });
  });

  describe('rotate', () => {
    it ('rotates', () => {
      const vector = new Vector([1, 0, 0]);
      let expected,
          rotated;

      // rotate 90 degrees down about y-axis
      rotated = vector.rotate([0, 1, 0], 90 * Math.PI / 180);
      expected = new Vector([0, 0, -1]);
      expect(vectorClose(rotated, expected)).toBeTruthy();

      // rotate 90 degrees up from xy-plane from non-zero origin
      rotated = vector.rotate([0, 1, 0], -90 * Math.PI / 180, [-1, 0, 0]);
      expected = new Vector([-1, 0, 2]);
      expect(vectorClose(rotated, expected)).toBeTruthy();

      rotated = vector.rotate([0, 1, 0], -90 * Math.PI / 180, new Vector([2, 0, 0]));
      expected = new Vector([2, 0, -1]);
      expect(vectorClose(rotated, expected)).toBeTruthy();

      // rotate 45 degree clockwise around z-axis
      rotated = vector.rotate(new Vector([0, 0, 1]), 45 * Math.PI / 180);
      expected = new Vector([Math.SQRT2 / 2, Math.SQRT2 / 2, 0]);
      expect(vectorClose(rotated, expected)).toBeTruthy();

      rotated = new Vector(Vector.rotate([0, 0, 1], [0, 1, 0], -90 * Math.PI / 180));
      expected = new Vector([-1, 0, 0]);
      expect(vectorClose(rotated, expected)).toBeTruthy();
    });
  });

  describe('subtract', () => {
    it('throws error when different sizes', () => {
      expect(() => {
        new Vector([1, 2, 3]).subtract([1, 2]);
      }).toThrowError();
    });
  });

  describe('toString', () => {
    it('formats vector', () => {
      expect(new Vector([1, 2, 3]).toString()).toEqual('1,2,3');
    });
  });

  describe('unit', () => {
    it('throws error when magnitude is zero', () => {
      expect(() => {
        new Vector([0, 0, 0]).unit();
      }).toThrowError();
    });
  });

  describe('x, y, z', () => {
    it('sets/gets value', () => {
      const vector = new Vector([0, 0, 0]);
      expect(vector.x()).toEqual(0);
      expect(vector.y()).toEqual(0);
      expect(vector.z()).toEqual(0);
      vector.x(1);
      vector.y(2);
      vector.z(3);
      expect(vector).toEqual(new Vector([1, 2, 3]));
    });
  });
});
