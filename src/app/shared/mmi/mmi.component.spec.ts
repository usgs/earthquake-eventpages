import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { MmiComponent } from './mmi.component';


describe('MmiComponent', () => {
  let component: MmiComponent;
  let fixture: ComponentFixture<MmiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MmiComponent,

        MockComponent({selector: 'shared-bubble', inputs: ['name', 'title']}),

        MockPipe('sharedRoman')
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set intensity', () => {
    it('sets intensity and roman value correctly', () => {
      component.intensity = 4.5;
      expect(component.intensity).toEqual(4.5);
    });
  });
});
