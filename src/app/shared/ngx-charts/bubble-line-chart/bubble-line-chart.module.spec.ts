import { BubbleLineChartModule } from './bubble-line-chart.module';

describe('BubbleLineChartModule', () => {
  let bubbleLineChartModule: BubbleLineChartModule;

  beforeEach(() => {
    bubbleLineChartModule = new BubbleLineChartModule();
  });

  it('should create an instance', () => {
    expect(bubbleLineChartModule).toBeTruthy();
  });
});
