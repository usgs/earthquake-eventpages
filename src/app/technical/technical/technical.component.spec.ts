import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TechnicalComponent } from './technical.component';
import { MockComponent } from 'ng2-mock-component';
import { EventService } from '../../event.service';
import { of } from 'rxjs/observable/of';

describe('TechnicalComponent', () => {
  let component: TechnicalComponent;
  let fixture: ComponentFixture<TechnicalComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(null)
    };

    TestBed.configureTestingModule({
      declarations: [
        TechnicalComponent,

        MockComponent({selector: 'technical-moment-tensor-summary', inputs: ['products']}),
        MockComponent({selector: 'technical-origin-summary'})
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
