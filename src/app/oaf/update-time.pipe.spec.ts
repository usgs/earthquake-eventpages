import { UpdateTimePipe } from './update-time.pipe';

describe('UpdateTimePipe', () => {
  it('create an instance', () => {
    const pipe = new UpdateTimePipe();
    expect(pipe).toBeTruthy();
  });

  it('adds time correctly', () => {
    const pipe = new UpdateTimePipe();

    expect(pipe.transform(1521674587503, '1 Day')).toEqual(1521760987503);
    expect(pipe.transform(1521674587503, '1 Week')).toEqual(1522279387503);
    expect(pipe.transform(1521674587503, '1 Month')).toEqual(1524266587503);
    expect(pipe.transform(1521674587503, '1 Year')).toEqual(1553210587503);
    expect(pipe.transform(1521674587503, 'Not Correct')).toEqual(null);
  });
});
