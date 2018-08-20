import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatExpansionModule,
  MatTableModule
} from '@angular/material';

import { MockPipe } from '../../mock-pipe';
import { MockComponent } from 'ng2-mock-component';

import { StationComponent } from './station.component';

describe('StationComponent', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StationComponent,

        MockComponent({
          inputs: ['bubble', 'intensity'],
          selector: 'shared-mmi'
        }),
        MockComponent({
          inputs: ['name', 'title'],
          selector: 'shared-bubble'
        }),
        MockComponent({
          inputs: ['flag'],
          selector: 'shared-station-flag'
        }),

        MockPipe('sharedDegrees'),
        MockPipe('sharedNumber'),
        MockPipe('sharedLocation')
      ],
      imports: [MatCardModule, MatExpansionModule, MatTableModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
