import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionComponent } from './attribution.component';

import { ContributorService } from '../../contributor.service';
import { EventService } from '../../event.service';


describe('AttributionComponent', () => {
  let component: AttributionComponent;
  let fixture: ComponentFixture<AttributionComponent>;

  beforeEach(async(() => {
    const contributorServiceStub = {
    };

    const eventServiceStub = {
    };

    TestBed.configureTestingModule({
      declarations: [ AttributionComponent ],
      providers: [
        {provide: ContributorService, useValue: contributorServiceStub},
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
