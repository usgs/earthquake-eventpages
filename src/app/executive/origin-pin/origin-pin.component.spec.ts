import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';
import { MockPipe } from '../../mock-pipe';

import { OriginPinComponent } from './origin-pin.component';
import { FormatterService } from '../../formatter.service';
import { Event } from '../../event';

describe('OriginPinComponent', () => {
  let component: OriginPinComponent;
  let fixture: ComponentFixture<OriginPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OriginPinComponent,

        MockPipe('contributorList')
      ],
      imports: [
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        RouterModule
      ],
      providers: [
        { provide: FormatterService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should fetch/set the origin product', () => {
      let event: Event,
          product,
          spy;

      event = new Event({});
      product = { id: 1 };

      // spy on event object
      component.event = event;
      spy = spyOn(component.event, 'getProduct').and.returnValue(product);

      // trigger ngOnChanges
      component.ngOnChanges();

      // check component's product value
      expect(spy).toHaveBeenCalled();
      expect(component.product).toEqual(product);
    });
  });

});
