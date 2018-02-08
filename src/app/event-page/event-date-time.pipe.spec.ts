import { EventDateTimePipe } from './event-date-time.pipe';

describe('EventDateTimePipe', () => {
  let formatterService,
      pipe;

  beforeEach(() => {
    formatterService = {
      dateTime: jasmine.createSpy('dateTime spy')
    };

    pipe = new EventDateTimePipe(formatterService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms event with good time', () => {
    pipe.transform({properties: {time: 0}});
    expect(formatterService.dateTime).toHaveBeenCalled();
    expect(formatterService.dateTime).toHaveBeenCalledWith(new Date(0));
  });

  it('transforms event with no time', () => {
    pipe.transform(null);
    expect(formatterService.dateTime).toHaveBeenCalled();
    expect(formatterService.dateTime).toHaveBeenCalledWith(null);
  });
});
