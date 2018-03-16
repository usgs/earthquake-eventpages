import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MetadataComponent } from './metadata.component';

import { EventService } from '../../core/event.service';
import { MetadataService } from '../../core/metadata.service';

import { of } from 'rxjs/observable/of';
import { MockComponent } from 'ng2-mock-component';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;

  beforeEach(async(() => {

    const eventServiceStub = {
      event$: of({}),
      product$: of({})
    };

    const metadataServiceStub = {
      metadata$: of({}),
      getMetadata: jasmine.createSpy('metadataService::get'),
    };

    TestBed.configureTestingModule({
      declarations: [
        MetadataComponent,
        MockComponent({selector: 'shakemap-input', inputs: ['smInput']}),
        MockComponent({selector: 'shakemap-output', inputs: ['smOutput']}),
        MockComponent({selector: 'shakemap-processing', inputs: ['smProcessing']})
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: MetadataService, useValue: metadataServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetadataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
