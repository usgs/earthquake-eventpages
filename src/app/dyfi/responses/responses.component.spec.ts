import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatDialogModule} from '@angular/material';
import {MatTableModule} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';

import { DyfiService } from '../dyfi.service';
import { EventService } from '../../core/event.service';
import { MockPipe } from '../../mock-pipe';
import {FormatterService} from '../../core/formatter.service';
import { ResponsesComponent } from './responses.component';


describe('ResponsesComponent', () => {
  let component: ResponsesComponent;
  let fixture: ComponentFixture<ResponsesComponent>;

  const eventServiceStub = {
    product$: of({})
  };

  const dyfiServiceStub = {
    getCdi: () => {},
    cdiZip$: of({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule
      ],
      declarations: [
        ResponsesComponent,

        MockComponent({selector: 'shared-mmi', inputs: ['intensity']}),
        MockPipe('sharedUnits'),
        MockPipe('sharedNumber'),
        MockPipe('sharedRoman')
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: DyfiService, useValue: dyfiServiceStub},
        FormatterService
      ]
    })
    .compileComponents();
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
      component.responses.data = [{
        'name': 'test name',
        'state': 'test state',
        'zip': 'test zip',
        'country': 'test country',
        'cdi': '1',
        'nresp': 'test responses',
        'dist': 'test distance',
        'lat': '2.2',
        'lon': '3.3'
      }
      ];

      const spy = spyOn(component.dialog, 'open').and.returnValue({});
      component.onDownload();

      // dialog opened
      expect(component.dialog.open).toHaveBeenCalled();
      // download formatted
      const lastCall = spy.calls.mostRecent().args[1];
      expect(lastCall.data.title).toEqual('Download DYFI Responses');
      expect(lastCall.data.message).toEqual('Copy then paste into a spreadsheet application');
      expect(lastCall.data.content).toEqual(
        'Name\tState\tZip\tCountry\tMMI\tResponses\tDistance\tLatitude\tLongitude\n' +
        'test name\ttest state\ttest zip\ttest country\tI\ttest responses\ttest distance km\t2.2\t3.3'
      );
    });
  });

});
