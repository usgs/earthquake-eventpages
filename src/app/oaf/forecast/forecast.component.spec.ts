import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { OafService } from '../oaf.service';
import { ForecastComponent } from './forecast.component';

describe('ForecastComponent', () => {
  let component: ForecastComponent;
  let fixture: ComponentFixture<ForecastComponent>;

  beforeEach(async(() => {
    const oafServiceStub = {
      getProduct: jasmine.createSpy('eventService::getOaf')
    };

    TestBed.configureTestingModule({
      declarations: [
        ForecastComponent,
        MockPipe('sharedDateTime'),
        MockComponent({
          inputs: ['forecast'],
          selector: 'forecast-probability-table'
        }),
        MockComponent({
          inputs: ['forecast'],
          selector: 'forecast-number-table'
        })
      ],
      providers: [{ provide: OafService, useValue: oafServiceStub }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
