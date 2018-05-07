import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { ShakemapPinComponent } from './shakemap-pin.component';


describe('ShakemapPinComponent', () => {
  let component: ShakemapPinComponent;
  let fixture: ComponentFixture<ShakemapPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakemapPinComponent,
        MockComponent({selector: 'basic-pin', inputs: ['link', 'product', 'title']}),
        MockComponent({selector: 'shared-mmi', inputs: ['bubble', 'intensity']}),

        MockPipe('getProduct')
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakemapPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
