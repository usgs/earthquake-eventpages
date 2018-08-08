import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { OafPinComponent } from './oaf-pin.component';


describe('OafPinComponent', () => {
  let component: OafPinComponent;
  let fixture: ComponentFixture<OafPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OafPinComponent,

        MockComponent({ selector: 'basic-pin',
            inputs: ['product', 'title', 'link']})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OafPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
