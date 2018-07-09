import { WaveformsModule } from './waveforms.module';

describe('WaveformsModule', () => {
  let waveformsModule: WaveformsModule;

  beforeEach(() => {
    waveformsModule = new WaveformsModule();
  });

  it('should create an instance', () => {
    expect(waveformsModule).toBeTruthy();
  });
});
