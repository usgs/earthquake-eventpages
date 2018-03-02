import { Matrix } from './matrix';


describe('Matrix', () => {

  describe('constructor', () => {
    it('estimates size', () => {
      expect(new Matrix([1, 2, 3, 4])).toEqual(new Matrix([1, 2, 3, 4], 2, 2));
      expect(new Matrix([1, 2, 3, 4, 5, 6], 2)).toEqual(new Matrix([1, 2, 3, 4, 5, 6], 2, 3));
      expect(new Matrix([1, 2, 3, 4, 5, 6], null, 2)).toEqual(new Matrix([1, 2, 3, 4, 5, 6], 3, 2));

      expect(() => {
        const m = new Matrix([1, 2, 3]);
      }).toThrowError();
      expect(() => {
        const m = new Matrix([1, 2, 3, 4, 5, 6], 4);
      }).toThrowError();
      expect(() => {
        const m = new Matrix([1, 2, 3, 4, 5, 6], null, 4);
      }).toThrowError();
    });
  });

  describe('add', () => {
    it('adds', () => {
      const matrix1 = new Matrix([1, 2, 3], 1, 3);
      const matrix2 = new Matrix([2, 3, 4], 1, 3);
      const matrix3 = new Matrix([3, 4, 5], 3, 1);

      expect(matrix1.add(matrix2)).toEqual(new Matrix([3, 5, 7], 1, 3));
      expect(() => {
        matrix2.add(matrix3);
      }).toThrowError();
    });
  });

  describe('diagonal', () => {
    it('extracts diagonal', () => {
      expect(new Matrix([
        1, 2, 3,
        4, 5, 6,
        7, 8, 9
      ], 3, 3).diagonal()).toEqual([1, 5, 9]);
      expect(new Matrix([
        1, 2,
        4, 5,
        7, 8
      ], 3, 2).diagonal()).toEqual([1, 5]);
      expect(new Matrix([
        1, 2, 3,
        4, 5, 6
      ], 2, 3).diagonal()).toEqual([1, 5]);

    });
  });

  describe('get/set/row/col', () => {
    it('get/set data', () => {
      const matrix = new Matrix([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ]);

      expect(matrix.get(0, 0)).toEqual(0);
      expect(matrix.get(0, 1)).toEqual(1);
      expect(matrix.get(0, 2)).toEqual(2);
      expect(matrix.get(1, 0)).toEqual(3);
      expect(matrix.get(1, 1)).toEqual(4);
      expect(matrix.get(1, 2)).toEqual(5);
      expect(matrix.get(2, 0)).toEqual(6);
      expect(matrix.get(2, 1)).toEqual(7);
      expect(matrix.get(2, 2)).toEqual(8);

      matrix.set(0, 0, 8);
      matrix.set(0, 1, 7);
      matrix.set(0, 2, 6);
      matrix.set(1, 0, 5);
      matrix.set(1, 1, 4);
      matrix.set(1, 2, 3);
      matrix.set(2, 0, 2);
      matrix.set(2, 1, 1);
      matrix.set(2, 2, 0);

      expect(matrix.get(0, 0)).toEqual(8);
      expect(matrix.get(0, 1)).toEqual(7);
      expect(matrix.get(0, 2)).toEqual(6);
      expect(matrix.get(1, 0)).toEqual(5);
      expect(matrix.get(1, 1)).toEqual(4);
      expect(matrix.get(1, 2)).toEqual(3);
      expect(matrix.get(2, 0)).toEqual(2);
      expect(matrix.get(2, 1)).toEqual(1);
      expect(matrix.get(2, 2)).toEqual(0);
    });

    it('row/col access data', () => {
      const matrix = new Matrix([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ]);

      expect(matrix.row(0)).toEqual([0, 1, 2]);
      expect(matrix.row(1)).toEqual([3, 4, 5]);
      expect(matrix.row(2)).toEqual([6, 7, 8]);
      expect(() => {
        matrix.row(3);
      }).toThrowError();

      expect(matrix.col(0)).toEqual([0, 3, 6]);
      expect(matrix.col(1)).toEqual([1, 4, 7]);
      expect(matrix.col(2)).toEqual([2, 5, 8]);
      expect(() => {
        matrix.col(3);
      }).toThrowError();

      expect(new Matrix([0, 1, 2], 1, 3).row(0)).toEqual([0, 1, 2]);
      expect(new Matrix([0, 1, 2], 3, 1).col(0)).toEqual([0, 1, 2]);
    });
  });

  describe('jacobi', () => {
    // 'urn:usgs-product:us:moment-tensor:us_2000cjfy_mww:1519977554040'
    const matrix = new Matrix([
      -3.0499E+19, -3.4237E+19, 1.0445E+19,
      -3.4237E+19, -2.3267E+19, 7.68E+18,
       1.0445E+19,  7.68E+18  , 5.3766E+19
    ]);

    it('computes eigenvalues and eigenvectors', () => {
      const eigenvectors = matrix.jacobi();

      expect(Math.abs(eigenvectors[0].eigenvalue - -6.27394e+19)).toBeLessThan(1e15);
      expect(Math.abs(eigenvectors[1].eigenvalue - 0.75108e+19)).toBeLessThan(1e15);
      expect(Math.abs(eigenvectors[2].eigenvalue - 5.52285e+19)).toBeLessThan(1e15);
    });

    it('throws error when it fails to converge', () => {
      expect(() => {
        matrix.jacobi(5);
      }).toThrowError();
    });

    it('throws error for non-symmetric matrix', () => {
      expect(() => {
        new Matrix([
          1, 2, 3,
          4, 5, 6
        ], 2, 3).jacobi();
      }).toThrowError();
    });

  });

  describe('multiply', () => {
    it('multiplies', () => {
      const matrix1 = new Matrix([
        0, 1, 2,
        3, 4, 5,
        6, 7, 8
      ], 3, 3);

      const matrix2 = new Matrix([
        1, 2,
        3, 4,
        5, 6
      ], 3, 2);

      expect(() => {
        matrix2.multiply(matrix1);
      }).toThrowError();
      expect(matrix1.multiply(matrix2)).toEqual(new Matrix([
        13, 16,
        40, 52,
        67, 88
      ], 3, 2));
    });
  });

  describe('negative', () => {
    it('negates', () => {
      expect(new Matrix([
        1, 2,
        3, 4
      ]).negative()).toEqual(new Matrix([
        -1, -2,
        -3, -4
      ]));
    });
  });

  describe('subtract', () => {
    it('subtracts', () => {
      const matrix1 = new Matrix([
        1, 2,
        3, 4
      ]);
      const matrix2 = new Matrix([
        8, 7,
        6, 5
      ]);

      expect(matrix2.subtract(matrix1)).toEqual(new Matrix([
        7, 5,
        3, 1
      ]));

      expect(() => {
        matrix2.subtract(new Matrix([1, 2], 1, 2));
      }).toThrowError();
    });
  });

  describe('toString', () => {
    it('strings', () => {
      expect(new Matrix([
        1, 2,
        3, 4
      ]).toString()).toEqual('[1, 2, \n 3, 4]');
    });
  });

  describe('transpose', () => {
    it('transposes', () => {
      expect(new Matrix([
        1, 2, 3,
        4, 5, 6
      ], 2, 3).transpose()).toEqual(new Matrix([
        1, 4,
        2, 5,
        3, 6
      ], 3, 2));
    });
  });
});
