import { EventLocationPipe } from './event-location.pipe';

describe('EventLocationPipe', () => {
  let formatterService;

  beforeEach(() => {
    formatterService = {
      location: jasmine.createSpy('location spy')
    };
  });

  it('create an instance', () => {
    const pipe = new EventLocationPipe(formatterService);
    expect(pipe).toBeTruthy();
  });
});
