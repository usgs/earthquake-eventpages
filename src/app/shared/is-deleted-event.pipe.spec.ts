import { IsDeletedEventPipe } from './is-deleted-event.pipe';

describe('IsDeletedEventPipe', () => {
  it('create an instance', () => {
    const pipe = new IsDeletedEventPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns true for deleted event', () => {
    const pipe = new IsDeletedEventPipe();
    const result = pipe.transform({
      properties: {
        status: 'deleted'
      }
    });
    expect(result).toBeTruthy();
  });

  it('returns false for non-deleted event', () => {
    const pipe = new IsDeletedEventPipe();
    const result = pipe.transform({
      properties: {
        status: 'NOT-deleted'
      }
    });
    expect(result).toBeFalsy();
  });

  it('returns false for null event status', () => {
    const pipe = new IsDeletedEventPipe();
    const result = pipe.transform({
      properties: {
        status: null
      }
    });
    expect(result).toBeFalsy();
  });

  it('returns false for no event status', () => {
    const pipe = new IsDeletedEventPipe();
    const result = pipe.transform({
      properties: {
        nostatus: null
      }
    });
    expect(result).toBeFalsy();
  });

  it('returns false for null properties', () => {
    const pipe = new IsDeletedEventPipe();
    const result = pipe.transform({ properties: null });
    expect(result).toBeFalsy();
  });

  it('returns false for no properties', () => {
    const pipe = new IsDeletedEventPipe();
    const result = pipe.transform({ noProperties: null });
    expect(result).toBeFalsy();
  });

  it('returns false for empty event', () => {
    const pipe = new IsDeletedEventPipe();
    const result = pipe.transform({});
    expect(result).toBeFalsy();
  });

  it('returns false for null input', () => {
    const pipe = new IsDeletedEventPipe();
    const result = pipe.transform(null);
    expect(result).toBeFalsy();
  });

  it('returns false for bad string input', () => {
    const pipe = new IsDeletedEventPipe();
    const result = pipe.transform('test');
    expect(result).toBeFalsy();
  });
});
