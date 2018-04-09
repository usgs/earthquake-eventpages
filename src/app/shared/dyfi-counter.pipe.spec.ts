import { DyfiCounterPipe } from './dyfi-counter.pipe';

describe('DyfiCounterPipe', () => {
  let formatterService,
      pipe;

  beforeEach(() => {
    formatterService = {
      leftPad: jasmine.createSpy('leftpad').and.returnValue('padding')
    };

    pipe = new DyfiCounterPipe(formatterService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('calls formatterService with num-responses value', () => {
    const product = {
      properties: {
        'num-responses': 345
      }
    };

    pipe.transform(product, 'padding');
    expect(formatterService.leftPad).toHaveBeenCalledWith('345', 'padding', '0');
  });

  it('calls formatterService with numResp value', () => {
    const product = {
      properties: {
        'numResp': 345
      }
    };

    pipe.transform(product, 'padding');
    expect(formatterService.leftPad).toHaveBeenCalledWith('345', 'padding', '0');
  });

  it('calls formatterService with 0 value', () => {
    const product = {
      properties: {
        'num-responses': null,
        'numResp': null
      }
    };

    pipe.transform(product, 'padding');
    expect(formatterService.leftPad).toHaveBeenCalledWith('0', 'padding', '0');
  });

  it('returns an array', () => {
    const product = {
      properties: {
        'num-responses': 123,
        'numResp': null
      }
    };

    expect(pipe.transform(product, 7)).toEqual(['p','a','d','d','i','n','g'])
  });
});
