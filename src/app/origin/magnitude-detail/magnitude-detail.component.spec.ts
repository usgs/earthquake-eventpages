import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagnitudeDetailComponent } from './magnitude-detail.component';
import { MatDialogModule, MatTableModule } from '@angular/material';

describe('MagnitudeDetailComponent', () => {
  let component: MagnitudeDetailComponent;
  let fixture: ComponentFixture<MagnitudeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatTableModule
      ],
      declarations: [
        MagnitudeDetailComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagnitudeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('contributions', () => {
    it('should set and get', () => {
      const data = [{'id': 'a'}, {'id': 'b'}];
      component.contributions = data;
      expect(component.contributions).toEqual(data);
    });
  });

  describe('onDownload', () => {
    it('formats download and opens dialog', () => {
      component.contributions = [
        {
          amplitude: 'test amplitude',
          amplitudeID: 'test amplitude id',
          channel: 'test channel',
          magnitude: 'test magnitude',
          period: 'test period',
          residual: 'test residual',
          stationMagnitudeID: 'test station magnitude id',
          stationMagnitudeContributionID: 'test station magnitude contribution id',
          status: 'test status',
          type: 'test type',
          unit: 'test unit',
          weight: 'test weight'
        }
      ];

      const spy = spyOn(component.dialog, 'open').and.returnValue({});
      component.onDownload();

      // dialog opened
      expect(component.dialog.open).toHaveBeenCalled();
      // download formatted
      expect(spy.calls.mostRecent().args[1].data.content).toEqual(
        'Channel\tType\tAmplitude\tPeriod\tStatus\tMagnitude\tWeight\n' +
        'test channel\ttest type\ttest amplitude\ttest period\ttest status\ttest magnitude\ttest weight'
      );
    });
  });

  describe('sortBy', () => {
    it('sorts numerically', () => {
      const data = {
        amplitude: '1.23 m',
        amplitudeID: 'test amplitude id',
        channel: 'test channel',
        magnitude: '4.56',
        period: null,
        residual: 'test residual',
        stationMagnitudeID: 'test station magnitude id',
        stationMagnitudeContributionID: 'test station magnitude contribution id',
        status: 'test status',
        type: 'test type',
        unit: 'test unit',
        weight: '0.74'
      };

      expect(component.sortBy(data, 'amplitude')).toEqual(1.23);
      expect(component.sortBy(data, 'magnitude')).toEqual(4.56);
      expect(component.sortBy(data, 'period')).toEqual(0);
      expect(component.sortBy(data, 'channel')).toEqual('test channel');
    });
  });
});
