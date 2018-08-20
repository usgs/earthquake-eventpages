import { EventDepthPipe } from './event-depth.pipe';

describe('EventDepthPipe', () => {
  let formatterService, pipe;

  beforeEach(() => {
    formatterService = {
      depth: jasmine.createSpy('depth spy')
    };

    pipe = new EventDepthPipe(formatterService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms event with good depth', () => {
    pipe.transform({ geometry: { coordinates: [0.0, 0.0, 50.0] } });
    expect(formatterService.depth).toHaveBeenCalled();
    expect(formatterService.depth).toHaveBeenCalledWith(50.0, 'km');
  });

  it('transforms event with bad depth', () => {
    pipe.transform({ geometry: { coordinates: [0.0, 0.0, 'depth'] } });
    expect(formatterService.depth).toHaveBeenCalled();
    expect(formatterService.depth).toHaveBeenCalledWith(NaN, 'km');
  });

  it('transforms null event without depth', () => {
    pipe.transform(null);
    expect(formatterService.depth).toHaveBeenCalled();
    expect(formatterService.depth).toHaveBeenCalledWith(NaN, 'km');
  });
});
