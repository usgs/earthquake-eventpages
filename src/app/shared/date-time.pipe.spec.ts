import { DateTimePipe } from './date-time.pipe';
import { FormatterService } from '@core/formatter.service';

fdescribe('DateTimePipe', () => {
  let formatterService, pipe;

  beforeEach(() => {
    formatterService = new FormatterService();

    pipe = new DateTimePipe(formatterService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transforms good time', () => {
    spyOn(formatterService, 'dateTime');
    pipe.transform(0);
    expect(formatterService.dateTime).toHaveBeenCalled();
    expect(formatterService.dateTime).toHaveBeenCalledWith(
      new Date(0),
      0,
      false
    );
  });

  it('transforms no time', () => {
    spyOn(formatterService, 'dateTime');
    pipe.transform(null);
    expect(formatterService.dateTime).toHaveBeenCalled();
    expect(formatterService.dateTime).toHaveBeenCalledWith(null, 0, false);
  });

  it('transforms timestamp', () => {
    const time = '2012-09-05T14:42:07Z';
    const timeCheck = '2012-09-05 14:42:07 (UTC)';
    const transTime = pipe.transform(time);
    expect(transTime).toBe(timeCheck);
  });

  it('transforms timestamp with milliseconds', () => {
    const time = '2012-09-05T14:42:07.123Z';
    const timeCheck = '2012-09-05 14:42:07.123 (UTC)';
    const transTime = pipe.transform(time, 0, true);
    expect(transTime).toBe(timeCheck);
  });

  it('transforms timestamp with offset', () => {
    const time = '2012-09-05T14:42:07Z';
    const timeCheck = '2012-09-05 15:42:07 (UTC+01:00)';
    const transTime = pipe.transform(time, 60, false);
    expect(transTime).toBe(timeCheck);
  });

  it('transforms ms since epoch', () => {
    const time = 1535676099824;
    const timeCheck = '2018-08-31 00:41:39 (UTC)';
    const transTime = pipe.transform(time);
    expect(transTime).toBe(timeCheck);
  });

  it('gracefully ignores string epoch', () => {
    const time = '1535676099824';
    const timeCheck = '-';
    const transTime = pipe.transform(time);
    expect(transTime).toBe(timeCheck);
  });

  it('gracefully ignores non-timestamp string', () => {
    const time = 'bad timestamp';
    const timeCheck = '-';
    const transTime = pipe.transform(time);
    expect(transTime).toBe(timeCheck);
  });
});
