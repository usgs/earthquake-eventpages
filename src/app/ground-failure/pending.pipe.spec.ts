import { PendingPipe } from './pending.pipe';

describe('PendingPipe', () => {
  it('create an instance', () => {
    const pipe = new PendingPipe();
    expect(pipe).toBeTruthy();
  });
});
