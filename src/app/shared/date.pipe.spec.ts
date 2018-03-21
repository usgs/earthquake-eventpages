import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  let formatterService,
      pipe;

  beforeEach(() => {
    formatterService = {
      dateTime: jasmine.createSpy('dateTime spy')
    };

    pipe = new DatePipe(formatterService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms good time', () => {
    pipe.transform(0);
    expect(formatterService.dateTime).toHaveBeenCalled();
    expect(formatterService.dateTime).toHaveBeenCalledWith(new Date(0));
  });

  it('transforms no time', () => {
    pipe.transform(null);
    expect(formatterService.dateTime).toHaveBeenCalled();
    expect(formatterService.dateTime).toHaveBeenCalledWith(null);
  });
});
