import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatTableModule } from '@angular/material';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../event.service';
import { PhaseComponent } from './phase.component';
import { QuakemlService } from '../../quakeml.service';

describe('PhaseComponent', () => {
  let component: PhaseComponent;
  let fixture: ComponentFixture<PhaseComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of({})
    };
    const quakemlServiceStub = {
      get: jasmine.createSpy('quakemlService::get'),
      quakeml$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        PhaseComponent
      ],
      imports: [
        MatDialogModule,
        MatTableModule
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: QuakemlService, useValue: quakemlServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
