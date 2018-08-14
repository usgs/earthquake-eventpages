import { Tensor } from './tensor';

/**
 * Deep comparison function.
 *
 * Only verifies values/attributes of expected value exist on actual.
 *
 * For strings, uses strict equality.
 * For numbers, expects value to be within 0.001 percent of actual value.
 * For objects, recurses.
 *
 * @param {any} actual value being checked.
 * @param {any} expected values to be checked.
 */
function isClose(actual: any, expected: any): boolean {
  if (expected === null || actual === null) {
    if (expected === null && actual === null) {
      return true;
    }
    return false;
  }

  let pass;
  if (typeof expected === 'number') {
    const percentDifference = Math.abs(actual - expected) / expected;
    pass = percentDifference < 0.001;
  } else if (typeof expected === 'object') {
    pass = Object.keys(expected).every(key => {
      if (actual.hasOwnProperty(key)) {
        return isClose(actual[key], expected[key]);
      }
      return false;
    });
  } else {
    pass = actual === expected;
  }
  if (!pass) {
    console.log(actual, expected);
  }
  return pass;
}

describe('Tensor', () => {
  beforeEach(function() {
    // use custom matcher
    jasmine.addMatchers({
      isCloseTo: () => {
        return {
          compare: (actual, expected) => {
            const result: any = {
              pass: isClose(actual, expected)
            };
            if (!result.pass) {
              result.message =
                'Expected ' +
                JSON.stringify(actual) +
                ' to be close to ' +
                JSON.stringify(expected);
            }
            return result;
          }
        };
      }
    });
  });

  it('calculates tensors correctly', () => {
    const tests = [
      // null product
      {
        expected: null,
        product: null
      },
      // product without type
      {
        expected: null,
        product: {}
      },
      // focal mechanism product
      {
        product: {
          expected: {
            NP1: {
              dip: 90,
              rake: -40,
              strike: 60
            },
            NP2: {
              dip: 50,
              rake: -180,
              strike: 150
            }
          },
          id:
            'urn:usgs-product:nc:focal-mechanism:nc72948801_fm1:' +
            '1515096353400',
          properties: {
            'nodal-plane-1-dip': '90.0',
            'nodal-plane-1-rake': '-40.0',
            'nodal-plane-1-strike': '60.0',
            'nodal-plane-2-dip': '50.0',
            'nodal-plane-2-rake': '-180.0',
            'nodal-plane-2-strike': '150.0'
          },
          type: 'focal-mechanism'
        }
      },
      // moment tensors
      {
        expected: {
          depth: '11.5',
          magnitude: 4.41,
          moment: 5.218e15,
          percentDC: 0.743,
          type: 'Mww'
        },
        product: {
          id: 'urn:usgs-product:us:moment-tensor:us_1000c0lx_mww:1519048034040',
          properties: {
            'derived-depth': '11.5',
            'derived-magnitude-type': 'Mww',
            'tensor-mpp': '4.5018E+15',
            'tensor-mrp': '6.302E+14',
            'tensor-mrr': '-1.1804E+15',
            'tensor-mrt': '-2.8013E+15',
            'tensor-mtp': '1.6229E+15',
            'tensor-mtt': '-3.3214E+15'
          },
          type: 'moment-tensor'
        }
      },
      {
        expected: {
          fCLVD: -0.02,
          forceNormal: 0.765,
          forceStrikeSlip: 0.02586,
          forceThrust: 0.2095,
          magnitude: 8.157,
          moment: 2.162e21,
          N: {
            eigenvalue: -0.044e21,
            vector: {
              data: [-0.718, 0.677, -0.161]
            }
          },
          NP1: {
            dip: 19.6,
            rake: -61,
            strike: 164
          },
          NP2: {
            dip: 72.9,
            rake: -100,
            strike: 314
          },
          P: {
            eigenvalue: -2.14e21,
            vector: {
              data: [0.422, 0.24, -0.874]
            }
          },
          percentDC: 0.96,
          T: {
            eigenvalue: 2.184e21,
            vector: {
              data: [0.553, 0.696, 0.458]
            }
          },
          type: 'Mww'
        },
        product: {
          id: 'urn:usgs-product:us:moment-tensor:us_2000ahv0_mww:1512676819040',
          properties: {
            'derived-depth': '45.5',
            'derived-magnitude-type': 'Mww',
            'tensor-mpp': '9.148E+20',
            'tensor-mrp': '-1.1493E+21',
            'tensor-mrr': '-1.18E+21',
            'tensor-mrt': '1.3369E+21',
            'tensor-mtp': '-6.46E+20',
            'tensor-mtt': '2.652E+20'
          },
          type: 'moment-tensor'
        }
      },
      {
        expected: {
          depth: '11.5',
          magnitude: 5.893,
          moment: 8.688e17,
          N: {
            eigenvalue: 1.137e17
          },
          P: {
            eigenvalue: -9.2e17
          },
          T: {
            eigenvalue: 8.063e17
          }
        },
        product: {
          id: 'urn:usgs-product:us:moment-tensor:us_1000ay3r_mww:1516225837040',
          properties: {
            depth: '11.5',
            'tensor-mpp': '1.0477E+17',
            'tensor-mrp': '1.2565E+17',
            'tensor-mrr': '-8.0046E+17',
            'tensor-mrt': '4.1298E+17',
            'tensor-mtp': '2.334E+16',
            'tensor-mtt': '6.9568E+17'
          },
          type: 'moment-tensor'
        }
      },
      {
        product: {
          expected: {
            magnitude: 7.12,
            moment: 5.934e19,
            N: {
              eigenvalue: 0.751e19
            },
            P: {
              eigenvalue: -6.274e19
            },
            T: {
              eigenvalue: 5.523e19
            }
          },
          id: 'urn:usgs-product:us:moment-tensor:us_2000cjfy_mww:1519977554040',
          properties: {
            'tensor-mpp': '-2.3267E+19',
            'tensor-mrp': '-7.68E+18',
            'tensor-mrr': '5.3766E+19',
            'tensor-mrt': '1.0445E+19',
            'tensor-mtp': '3.4237E+19',
            'tensor-mtt': '-3.0499E+19'
          },
          type: 'moment-tensor'
        }
      },
      // translate beachball-type
      {
        expected: {
          type: 'TMTS'
        },
        product: {
          properties: {
            'beachball-type': 'smi:ci.anss.org/momentTensor/TMTS'
          },
          type: 'focal-mechanism'
        }
      }
    ];

    tests.forEach(t => {
      const tensor = Tensor.fromProduct(t.product);
      // isCloseTo is defined in the beforeEach
      expect(tensor).isCloseTo(t.expected);
    });
  });

  describe('range', () => {
    it('shifts values into range', () => {
      expect(Tensor.range(-181, -180, 180)).toEqual(179);
      expect(Tensor.range(181, -180, 180)).toEqual(-179);
    });
  });

  describe('sortEigenvalues', () => {
    it('sorts by eigenvalue descending', () => {
      const eigenvalue1 = { eigenvalue: 1 };
      const eigenvalue2 = { eigenvalue: 2 };
      expect(Tensor.sortEigenvalues(eigenvalue1, eigenvalue2)).toEqual(1);
      expect(Tensor.sortEigenvalues(eigenvalue2, eigenvalue1)).toEqual(-1);
      expect(Tensor.sortEigenvalues(eigenvalue1, eigenvalue1)).toEqual(0);
    });
  });
});
