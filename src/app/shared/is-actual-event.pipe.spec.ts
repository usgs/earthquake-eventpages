import { IsActualEventPipe } from './is-actual-event.pipe';

describe('IsActualEventPipe', () => {
  it('create an instance', () => {
    const pipe = new IsActualEventPipe();
    expect(pipe).toBeTruthy();
  });
});
