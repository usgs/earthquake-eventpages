import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventService } from '@core/event.service';
import { MockComponent } from 'ng2-mock-component';

import { ShakeAlertMissedComponent } from './shake-alert-missed.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ShakeAlertMissedComponent', () => {
  let component: ShakeAlertMissedComponent;
  let fixture: ComponentFixture<ShakeAlertMissedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakeAlertMissedComponent,

        MockComponent({
          inputs: ['product', 'contentPath'],
          selector: 'shared-text-product'
        })
      ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [EventService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakeAlertMissedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
