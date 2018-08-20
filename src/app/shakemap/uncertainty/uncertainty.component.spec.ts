import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { MockPipe } from '../../mock-pipe';
import { UncertaintyComponent } from './uncertainty.component';

describe('UncertaintyComponent', () => {
  let component: UncertaintyComponent;
  let fixture: ComponentFixture<UncertaintyComponent>;

  beforeEach(async(() => {
    const PRODUCT = {
      contents: {
        'download/urat_pga.jpg': {
          url: 'some_url'
        }
      }
    };

    const eventServiceStub = {
      event$: of({}),
      product$: of(PRODUCT)
    };

    TestBed.configureTestingModule({
      declarations: [UncertaintyComponent, MockPipe('sharedProductContent')],
      providers: [{ provide: EventService, useValue: eventServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UncertaintyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
