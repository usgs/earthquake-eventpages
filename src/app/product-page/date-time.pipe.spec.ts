import { DateTimePipe } from './date-time.pipe';

describe('ContributorListPipe', () => {
  let formatter, pipe;

  beforeEach(() => {
    formatter = {
      dateTime: jasmine.createSpy('formatter::dateTime')
    };

    pipe = new DateTimePipe(formatter);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms numeric date', () => {
    const date = new Date('2017-01-01T12:34:56Z');
    pipe.transform(date.getTime());
    expect(formatter.dateTime).toHaveBeenCalledWith(date);
  });

  it('transforms iso date', () => {
    const date = new Date('2017-01-01T12:34:56Z');
    pipe.transform(date.toISOString());
    expect(formatter.dateTime).toHaveBeenCalledWith(date);
  });

  it('transforms null date', () => {
    const date = new Date(null);
    pipe.transform(null);
    expect(formatter.dateTime).toHaveBeenCalledWith(date);
  });
});
