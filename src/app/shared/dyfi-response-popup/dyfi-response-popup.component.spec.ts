import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { DyfiResponsePopupComponent } from './dyfi-response-popup.component';
import { MockPipe } from '../../mock-pipe';

describe('DyfiResponsePopupComponent', () => {
  let component: DyfiResponsePopupComponent;
  let fixture: ComponentFixture<DyfiResponsePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DyfiResponsePopupComponent,
        MockComponent({
          inputs: ['intensity', 'value', 'bubble'],
          selector: 'shared-mmi'
        }),
        MockPipe('sharedRoman')
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiResponsePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('sets all inputs properly', () => {
    component.dist = 11;
    component.intensity = 3;
    component.mmi = 2;
    component.name = 'Test response popup';
    component.nresp = 3;
    expect(component.dist).toEqual(11);
    expect(component.intensity).toEqual(3);
    expect(component.mmi).toEqual(2);
    expect(component.name).toEqual('Test response popup');
    expect(component.nresp).toEqual(3);
  });
});
