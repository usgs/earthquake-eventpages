import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatIconModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';
import { RouterModule } from '@angular/router';

import { FocalMechanismSummaryComponent } from './focal-mechanism-summary.component';
import { MockPipe } from '../../mock-pipe';
import { Tensor } from '../../shared/beachball/tensor';

describe('FocalMechanismSummaryComponent', () => {
  let component: FocalMechanismSummaryComponent;
  let fixture: ComponentFixture<FocalMechanismSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatTableModule,
        RouterModule
      ],
      declarations: [
        FocalMechanismSummaryComponent,
        MockComponent({selector: 'shared-beachball', inputs: ['fillColor', 'labelAxes', 'labelPlanes', 'size', 'tensor']}),
        MockComponent({selector: 'shared-product-attribution', inputs: ['product']}),

        MockPipe('sharedDegrees')
      ],
      providers: [
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FocalMechanismSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set products', () => {
    it('populates tensors', () => {
      spyOn(Tensor, 'fromProduct').and.returnValues({id: 1}, {id: 'b'});
      component.products = [{}, {}];
      expect(component.tensors).toEqual([{id: 1}, {id: 'b'}]);
    });

    it('clears tensors', () => {
      component.tensors = [{}, {}];
      component.products = null;
      expect(component.tensors).toEqual([]);
    });
  });
});
