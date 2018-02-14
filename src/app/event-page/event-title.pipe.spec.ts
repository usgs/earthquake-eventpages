import { EventTitlePipe } from './event-title.pipe';

describe('EventTitlePipe', () => {
  it('create an instance', () => {
    const pipe = new EventTitlePipe();
    expect(pipe).toBeTruthy();
  });

  it('transform uses the title', () => {
    const pipe = new EventTitlePipe();
    const event = {
      properties: {
        title: 'Custom Event Title'
      }
    };

    expect(pipe.transform(event)).toEqual(event.properties.title);
  });
});
