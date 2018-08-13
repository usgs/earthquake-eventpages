import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { PagerPopulationComponent } from './pager-population.component';

describe('PagerPopulationComponent', () => {
  let component: PagerPopulationComponent;
  let fixture: ComponentFixture<PagerPopulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagerPopulationComponent,

        MockComponent({
          selector: 'shared-mmi',
          inputs: ['intensity', 'value', 'bubble']
        }),
        MockPipe('sharedNumber')
      ],
      imports: [MatTableModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerPopulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
