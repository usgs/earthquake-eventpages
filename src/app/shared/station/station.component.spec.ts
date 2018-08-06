import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatCardModule,
  MatExpansionModule,
  MatTableModule } from '@angular/material';

import { MockPipe } from '../../mock-pipe';
import { MockComponent } from 'ng2-mock-component';

import { StationComponent } from './station.component';


describe('StationComponent', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatExpansionModule,
        MatTableModule
      ],
      declarations: [
        StationComponent,

        MockPipe('sharedDegrees'),
        MockPipe('sharedNumber'),
        MockPipe('sharedLocation'),
        MockComponent({selector: 'shared-mmi', inputs: ['bubble',
        'intensity']}),
        MockComponent({selector: 'shared-bubble', inputs: ['name', 'title']}),
        MockComponent({selector: 'shared-station-flag', inputs: ['flag']})
      ]
    })
    .compileComponents();
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
