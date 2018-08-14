import { WildcardModule } from './wildcard.module';

describe('WildcardModule', () => {
  let wildcardModule: WildcardModule;

  beforeEach(() => {
    wildcardModule = new WildcardModule();
  });

  it('should create an instance', () => {
    expect(wildcardModule).toBeTruthy();
  });
});
