import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockComponent } from 'ng2-mock-component';

import { TsunamiPinComponent } from './tsunami-pin.component';

describe('TsunamiPinComponent', () => {
  let component: TsunamiPinComponent;
  let fixture: ComponentFixture<TsunamiPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TsunamiPinComponent,
        MockComponent({selector: 'basic-pin', inputs: ['footer']})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TsunamiPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
