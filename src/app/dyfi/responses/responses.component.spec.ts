import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatDialogModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';

import { EventService } from '@core/event.service';
import { FormatterService } from '@core/formatter.service';
import { MockPipe } from '../../mock-pipe';
import { DyfiService } from '../dyfi.service';
import { ResponsesComponent } from './responses.component';

describe('ResponsesComponent', () => {
  let component: ResponsesComponent;
  let fixture: ComponentFixture<ResponsesComponent>;

  const eventServiceStub = {
    product$: of({})
  };

  const dyfiServiceStub = {
    cdiZip$: of({}),
    getCdi: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResponsesComponent,

        MockComponent({ selector: 'shared-mmi', inputs: ['intensity'] }),
        MockPipe('sharedUnits'),
        MockPipe('sharedNumber'),
        MockPipe('sharedRoman')
      ],
      imports: [
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: DyfiService, useValue: dyfiServiceStub },
        FormatterService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDownload', () => {
    it('formats download and opens dialog', () => {
      component.responses.data = [
        {
          cdi: '1',
          country: 'test country',
          dist: 'test distance',
          lat: '2.2',
          lon: '3.3',
          name: 'test name',
          nresp: 'test responses',
          state: 'test state',
          zip: 'test zip'
        }
      ];

      const spy = spyOn(component.dialog, 'open').and.returnValue({});
      component.onDownload();

      // dialog opened
      expect(component.dialog.open).toHaveBeenCalled();
      // download formatted
      const lastCall = spy.calls.mostRecent().args[1];
      expect(lastCall.data.title).toEqual('Download DYFI Responses');
      expect(lastCall.data.message).toEqual(
        'Copy then paste into a spreadsheet application'
      );
      expect(lastCall.data.content).toEqual(
        'City\tState/Region\tCountry\tZip Code\tMMI\tResponses\t' +
          'Distance\tLatitude\tLongitude\ntest name\ttest state\t' +
          'test country\ttest zip\tI\ttest responses\t' +
          'test distance km\t2.2\t3.3'
      );
    });
  });
});
