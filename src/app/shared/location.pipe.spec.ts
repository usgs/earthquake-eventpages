import { LocationPipe } from './location.pipe';


describe('LocationPipe', () => {
  let formatterService,
      pipe;

  beforeEach(() => {
    formatterService = {
      location: jasmine.createSpy('location spy')
    };

    pipe = new LocationPipe(formatterService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms coordinates', () => {
    pipe.transform([180.0, 90.0]);
    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location)
      .toHaveBeenCalledWith(90.0, 180.0, undefined);
  });

  it('transforms bad coordinates', () => {
    pipe.transform([0.0, 'latitude']);

    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location)
      .toHaveBeenCalledWith(NaN, 0.0, undefined);
    formatterService.location.calls.reset();

    pipe.transform(['longitude', 0.0]);
    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location)
      .toHaveBeenCalledWith(0.0, NaN, undefined);
    formatterService.location.calls.reset();

    pipe.transform(['longitude', 'latitude']);
    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location)
      .toHaveBeenCalledWith(NaN, NaN, undefined);
    formatterService.location.calls.reset();
  });

  it('transforms null event', () => {
    pipe.transform(null);
    expect(formatterService.location).toHaveBeenCalled();
    expect(formatterService.location)
      .toHaveBeenCalledWith(NaN, NaN, undefined);
  });
});
