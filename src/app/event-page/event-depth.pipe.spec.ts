import { EventDepthPipe } from './event-depth.pipe';

describe('EventDepthPipe', () => {
  let formatterService;

  beforeEach(() => {
    formatterService = {
      depth: jasmine.createSpy('depth spy')
    };
  });

  it('create an instance', () => {
    const pipe = new EventDepthPipe(formatterService);
    expect(pipe).toBeTruthy();
  });
});
