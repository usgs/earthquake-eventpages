import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule, MatTableModule } from '@angular/material';
import { MockComponent } from 'ng2-mock-component';

import { PagerCitiesComponent } from './pager-cities.component';
import { MockPipe } from '../../mock-pipe';

describe('PagerCitiesComponent', () => {
  let component: PagerCitiesComponent;
  let fixture: ComponentFixture<PagerCitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PagerCitiesComponent,

        MockComponent({selector: 'shared-mmi',
            inputs: ['intensity', 'value', 'bubble']}),
        MockPipe('sharedNumber')
      ],
      imports: [
        MatCheckboxModule,
        MatTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagerCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
