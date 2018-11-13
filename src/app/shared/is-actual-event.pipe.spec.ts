import { IsActualEventPipe } from './is-actual-event.pipe';
import { ScenarioEvent } from 'app/scenario-event';
import { Event } from 'app/event';

describe('IsActualEventPipe', () => {
  it('create an instance', () => {
    const pipe = new IsActualEventPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns false for scenario event', () => {
    const event = new ScenarioEvent({});
    const pipe = new IsActualEventPipe();
    expect(pipe.transform(event)).toBeFalsy();
  });

  it('returns true for an actual event', () => {
    const event = new Event({});
    const pipe = new IsActualEventPipe();
    expect(pipe.transform(event)).toBeTruthy();
  });

  it('handles null', () => {
    const pipe = new IsActualEventPipe();
    expect(pipe.transform(null)).toBeFalsy();
  });
});
