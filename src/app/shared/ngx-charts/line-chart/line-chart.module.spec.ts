import { LineChartModule } from './line-chart.module';

describe('LineChartModule', () => {
  let lineChartModule: LineChartModule;

  beforeEach(() => {
    lineChartModule = new LineChartModule();
  });

  it('should create an instance', () => {
    expect(lineChartModule).toBeTruthy();
  });
});
