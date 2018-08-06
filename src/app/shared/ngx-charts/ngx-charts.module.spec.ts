import { NgxChartsModule } from './ngx-charts.module';


describe('NgxChartsModule', () => {
  let ngxChartsModule: NgxChartsModule;

  beforeEach(() => {
    ngxChartsModule = new NgxChartsModule();
  });

  it('should create an instance', () => {
    expect(ngxChartsModule).toBeTruthy();
  });
});
