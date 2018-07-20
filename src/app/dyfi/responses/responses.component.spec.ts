import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';

import { DyfiService } from '../dyfi.service';
import { EventService } from '../../core/event.service';
import { MockPipe } from '../../mock-pipe';
import { ResponsesComponent } from './responses.component';
import {FormatterService} from '../../core/formatter.service';
import {MatDialogModule} from '@angular/material';

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
      component.responses.filteredData = [{
        'name': 'test name',
        'state': 'test state',
        'country': 'test country',
        'zip': 'test zip',
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
      expect(lastCall.data.title).toEqual('Donwload DYFI Responses');
      expect(lastCall.data.message).toEqual('Copy then paste into a spreadsheet application');
      expect(lastCall.data.content).toEqual(
        'Location\tMMI\tResponses\tDistance\tLatitude\tLongitude\n' +
        'test name test state test country test zip\tI\ttest responses\ttest distance km\t2.2\t3.3'
      );
    });
  });

});
