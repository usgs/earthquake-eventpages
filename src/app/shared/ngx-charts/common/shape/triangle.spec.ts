import { Triangle } from './triangle';

describe('Triangle', () => {
  it('creates', () => {
    const tri = new Triangle(5);
    expect(tri).toBeTruthy();
  });

  it('sets path, radius, and transform', () => {
    const tri = new Triangle(5);
    expect(tri.path).toBeTruthy();
    expect(tri.radius).toBeTruthy();
    expect(tri.transform).toBeTruthy();
  });
});
