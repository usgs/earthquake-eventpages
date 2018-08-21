import { OrderByPipe } from './order-by.pipe';


describe('OrderByPipe', () => {
  let pipe;

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Orders ascending data', () => {
    const data = [
      {'order': 3},
      {'order': 1},
      {'order': 2}
    ];

    const ordered = pipe.transform(data, ['order']);
    expect(ordered[0].order).toBe(1);
    expect(ordered[1].order).toBe(2);
    expect(ordered[2].order).toBe(3);
  });

  it('Orders descending data', () => {
    const data = [
      {'order': 3},
      {'order': 1},
      {'order': 2}
    ];

    const ordered = pipe.transform(data, ['order'], true);
    expect(ordered[0].order).toBe(3);
    expect(ordered[1].order).toBe(2);
    expect(ordered[2].order).toBe(1);
  });


  it('Orders using deep properties', () => {
    const data = [
      {'properties': {'order': 3}},
      {'properties': {'order': 1}},
      {'properties': {'order': 2}},
    ];

    const ordered = pipe.transform(data, ['properties', 'order']);
    expect(ordered[0].properties.order).toBe(1);
    expect(ordered[1].properties.order).toBe(2);
    expect(ordered[2].properties.order).toBe(3);
  });

  it('Orders using deep properties in descending order', () => {
    const data = [
      {'properties': {'order': 3}},
      {'properties': {'order': 1}},
      {'properties': {'order': 2}},
    ];

    const ordered = pipe.transform(data, ['properties', 'order'], true);
    expect(ordered[0].properties.order).toBe(3);
    expect(ordered[1].properties.order).toBe(2);
    expect(ordered[2].properties.order).toBe(1);
  });


});
