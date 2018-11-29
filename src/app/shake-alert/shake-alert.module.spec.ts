import { ShakeAlertModule } from './shake-alert.module';

describe('ShakeAlertModule', () => {
  let shakeAlertModule: ShakeAlertModule;

  beforeEach(() => {
    shakeAlertModule = new ShakeAlertModule();
  });

  it('should create an instance', () => {
    expect(shakeAlertModule).toBeTruthy();
  });
});
