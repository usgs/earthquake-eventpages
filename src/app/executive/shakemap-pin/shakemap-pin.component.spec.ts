import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

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
        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        }),
        MockComponent({
          inputs: ['bubble', 'intensity'],
          selector: 'shared-mmi'
        }),

        MockPipe('getProduct'),
        MockPipe('sharedProductContent')
      ],
    imports: [
      RouterTestingModule
    ]
    }).compileComponents();
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
