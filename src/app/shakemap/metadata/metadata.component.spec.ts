import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MetadataComponent } from './metadata.component';

import { EventService } from '../../event.service';
import { MetadataService } from '../../metadata.service';

import { of } from 'rxjs/observable/of';

describe('InfoComponent', () => {
  let component: MetadataComponent;
  let fixture: ComponentFixture<MetadataComponent>;

  beforeEach(async(() => {

    const eventServiceStub = {
      event$: of({}),
      product$: of({})
    };

    const metadataServiceStub = {
      metadata: of({}),
      getMetadata: jasmine.createSpy('metadataService::get'),
    };

    TestBed.configureTestingModule({
      declarations: [ MetadataComponent ],
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
