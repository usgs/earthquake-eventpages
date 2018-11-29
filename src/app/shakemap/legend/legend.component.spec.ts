import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendComponent } from './legend.component';
import { MockPipe } from '../../mock-pipe';

describe('LegendComponent', () => {
  let component: LegendComponent;
  let fixture: ComponentFixture<LegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LegendComponent,

        MockPipe('sharedProductProperty')
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
