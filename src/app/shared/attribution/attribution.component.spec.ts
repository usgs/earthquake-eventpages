import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributionComponent } from './attribution.component';

import { ContributorService } from '../../core/contributor.service';
import { EventService } from '../../core/event.service';

import { Event } from '../../event';


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

  describe('hasIndex', () => {
    it('properly verifies index property', () => {
      expect(component.hasIndex({})).toBeFalsy();
      expect(component.hasIndex({index: null})).toBeFalsy();
      expect(component.hasIndex({index: false})).toBeFalsy();
      expect(component.hasIndex({index: 0})).toBeTruthy();
      expect(component.hasIndex({index: 2})).toBeTruthy();
    });
  });

  describe('sourceCodeToInfo', () => {
    it('short-circuits if no sourceCode provided', () => {
      const result = component.sourceCodeToInfo(null);
      expect(result).toBe('');
    });

    it('works without an event', () => {
      const result = component.sourceCodeToInfo('Id');
      expect(result).toEqual({id: 'ID', index: 0, details: undefined});
    });

    it('works without a details map', () => {
      const event = new Event({properties: {sources: ',foo,id,bar,'}});
      const result = component.sourceCodeToInfo('Id', event);

      expect(result).toEqual({id: 'ID', index: 3, details: undefined});
    });

    it('works as expected', () => {
      const event = new Event({properties: {sources: ',foo,id,bar,'}});
      const details = [{id: 'id', aliases: ['myid', 'yourid']}];

      expect(component.sourceCodeToInfo('Id', event, details))
         .toEqual({id: 'ID', index: 3, details: details[0]});

      expect(component.sourceCodeToInfo('MYID', event, details))
         .toEqual({id: 'ID', index: 3, details: details[0]});
    });
  });
});
