import { EventDepthPipe } from './event-depth.pipe';

describe('EventDepthPipe', () => {
  it('create an instance', () => {
    const pipe = new EventDepthPipe();
    expect(pipe).toBeTruthy();
  });
});
