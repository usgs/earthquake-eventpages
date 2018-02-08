import { EventDateTimePipe } from './event-date-time.pipe';

describe('EventDateTimePipe', () => {
  let formatterService;

  beforeEach(() => {
    formatterService = {
      dateTime: jasmine.createSpy('dateTime spy')
    };
  });

  it('create an instance', () => {
    const pipe = new EventDateTimePipe(formatterService);
    expect(pipe).toBeTruthy();
  });
});
