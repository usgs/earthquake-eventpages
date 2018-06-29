import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs';

import { DyfiService } from '../dyfi.service';
import { EventService } from '../../core/event.service';
import { MockPipe } from '../../mock-pipe';
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
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        NoopAnimationsModule
      ],
      declarations: [
        ResponsesComponent,

        MockComponent({selector: 'shared-mmi', inputs: ['intensity']}),
        MockPipe('sharedUnits')
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: DyfiService, useValue: dyfiServiceStub}
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
});
