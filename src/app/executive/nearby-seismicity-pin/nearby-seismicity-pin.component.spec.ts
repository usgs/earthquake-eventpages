import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearbySeismicityPinComponent } from './nearby-seismicity-pin.component';
import {MockComponent} from 'ng2-mock-component';

describe('NearbySeismicityPinComponent', () => {
  let component: NearbySeismicityPinComponent;
  let fixture: ComponentFixture<NearbySeismicityPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NearbySeismicityPinComponent,

        MockComponent({selector: 'basic-pin', inputs: ['footer', 'title', 'href']})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearbySeismicityPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
