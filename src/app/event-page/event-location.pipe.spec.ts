import { EventLocationPipe } from './event-location.pipe';

describe('EventLocationPipe', () => {
  let formatterService,
      pipe;

  beforeEach(() => {
    formatterService = {
      location: jasmine.createSpy('location spy')
    };

    pipe = new EventLocationPipe(formatterService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms event with coordinates', () => {
    pipe.transform({geometry: {coordinates: [180.0, 90.0]}});
    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location).toHaveBeenCalledWith(90.0, 180.0, undefined);
  });

  it('transforms event with bad coordinates', () => {
    pipe.transform({geometry: {coordinates: [0.0, 'latitude']}});

    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location).toHaveBeenCalledWith(NaN, 0.0, undefined);
    formatterService.location.calls.reset();

    pipe.transform({geometry: {coordinates: ['longitude', 0.0]}});
    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location).toHaveBeenCalledWith(0.0, NaN, undefined);
    formatterService.location.calls.reset();

    pipe.transform({geometry: {coordinates: ['longitude', 'latitude']}});
    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location).toHaveBeenCalledWith(NaN, NaN, undefined);
    formatterService.location.calls.reset();
  });

  it('transforms null event', () => {
    pipe.transform(null);
    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location).toHaveBeenCalledWith(NaN, NaN, undefined);
  });
});
