import { BubbleChartModule } from './bubble-chart.module';


describe('BubbleChartModule', () => {
  let bubbleChartModule: BubbleChartModule;

  beforeEach(() => {
    bubbleChartModule = new BubbleChartModule();
  });

  it('should create an instance', () => {
    expect(bubbleChartModule).toBeTruthy();
  });
});
