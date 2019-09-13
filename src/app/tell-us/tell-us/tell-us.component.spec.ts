import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { Event } from '../../event';
import { FormLanguageService } from '../form-language.service';
import { TellUsComponent } from './tell-us.component';
import { EventService } from '@core/event.service';
import { FormSubmitService } from 'app/tell-us/form-submit.service';

describe('tell-us-tell-us', () => {
  let component: TellUsComponent;
  let fixture: ComponentFixture<TellUsComponent>;
  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of(new Event({}))
    };
    const languageServiceStub = {
      getLanguage: jasmine.createSpy('languageService::getLanguage'),
      language$: of({})
    };
    const formSubmitServiceStub = {};

    TestBed.configureTestingModule({
      declarations: [
        TellUsComponent,

        MockComponent({
          inputs: ['response'],
          selector: 'tell-us-response'
        }),
        MockComponent({
          inputs: ['event', 'labels'],
          selector: 'tell-us-form'
        }),
        MockComponent({
          inputs: ['productType', 'event'],
          selector: 'shared-summary-link'
        })
      ],
      imports: [RouterTestingModule],
      providers: [
        { provide: FormLanguageService, useValue: languageServiceStub },
        { provide: EventService, useValue: eventServiceStub },
        { provide: FormSubmitService, useValue: formSubmitServiceStub }
      ]
    });

    TestBed.compileComponents();
  }));
  beforeEach(() => {
    try {
      fixture = TestBed.createComponent(TellUsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    } catch (e) {
      console.log(e.stack);
      throw e;
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
