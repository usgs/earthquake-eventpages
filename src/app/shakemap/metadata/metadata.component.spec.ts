import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '@core/event.service';
import { MetadataService } from '@core/metadata.service';
import { MetadataComponent } from './metadata.component';
import { ConvertCharacterPipe } from '@shared/convert-character.pipe';

describe('MetadataComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      event$: of({}),
      product$: of({})
    };

    const metadataServiceStub = {
      getMetadata: jasmine.createSpy('metadataService::get'),
      metadata$: of({})
    };

    TestBed.configureTestingModule({
      declarations: [
        MetadataComponent,
        MockComponent({ selector: 'shakemap-input', inputs: ['smInput'] }),
        MockComponent({ selector: 'shakemap-output', inputs: ['smOutput'] }),
        MockComponent({
          inputs: ['smProcessing'],
          selector: 'shakemap-processing'
        })
      ],
      providers: [
        { provide: EventService, useValue: eventServiceStub },
        { provide: MetadataService, useValue: metadataServiceStub },
        { provide: ConvertCharacterPipe }
      ]
    }).compileComponents();
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
