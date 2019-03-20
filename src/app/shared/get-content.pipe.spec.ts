import { GetContentPipe } from './get-content.pipe';

describe('GetContentPipe', () => {
  let pipe, contentXMLService;
  beforeEach(() => {
    contentXMLService = {
      getContent: jasmine.createSpy('getContent spy')
    };

    pipe = new GetContentPipe(contentXMLService);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
