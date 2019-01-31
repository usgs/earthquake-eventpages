import { DirectionPipe } from './direction.pipe';

describe('DirectionPipe', () => {
  let formatter, pipe;

  beforeEach(() => {
    formatter = {
      empty: '--'
    };
    pipe = new DirectionPipe(formatter);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should accept compass wind as input and preserve', () => {
    expect(pipe.transform('SSE')).toEqual('SSE');
  });
  it('should calculate correct winds when azimuth is negative', () => {
    expect(pipe.transform(-557.3)).toEqual('SSE');
  });
  it('should calculate correct winds when azimuth is negative', () => {
    expect(pipe.transform(162.7)).toEqual('SSE');
  });
  it('should calculate correct winds when azimuth is negative', () => {
    expect(pipe.transform(522.7)).toEqual('SSE');
  });
});
