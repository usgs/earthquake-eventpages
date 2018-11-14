import { ScenarioEvent } from 'app/scenario-event';
import { IsScenarioEventPipe } from './is-scenario-event.pipe';
import { Event } from 'app/event';

describe('IsScenarioEventPipe', () => {
  it('create an instance', () => {
    const pipe = new IsScenarioEventPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns true for scenario event', () => {
    const event = new ScenarioEvent({});
    const pipe = new IsScenarioEventPipe();
    expect(pipe.transform(event)).toBeTruthy();
  });

  it('returns false for actual event', () => {
    const event = new Event({});
    const pipe = new IsScenarioEventPipe();
    expect(pipe.transform(event)).toBeFalsy();
  });

  it('handles null', () => {
    const pipe = new IsScenarioEventPipe();
    expect(pipe.transform(null)).toBeFalsy();
  });
});
