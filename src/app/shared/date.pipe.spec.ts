import { DatePipe } from './date.pipe';

describe('DatePipe', () => {
  let formatter;

  it('create an instance', () => {
    const pipe = new DatePipe(formatter);
    expect(pipe).toBeTruthy();
  });
});
