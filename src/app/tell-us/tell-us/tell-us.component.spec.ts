import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TellUsComponent } from './tell-us.component';
import { MatButtonModule, MatDialogModule, MatDialog } from '@angular/material';
import { of } from 'rxjs/observable/of';
import { EventService } from '../../../..';
import { Event } from '../../event';

describe('TellUsComponent', () => {
  let component: TellUsComponent;
  let fixture: ComponentFixture<TellUsComponent>;

  beforeEach(async(() => {
    const dialogStub = {
      open: () => {}
    };

    const eventServiceStub = {
      event$: of(new Event({}))
    };

    TestBed.configureTestingModule({
      declarations: [
        TellUsComponent
      ],
      imports: [
        MatButtonModule
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: MatDialog, useValue: dialogStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TellUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
