import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatExpansionModule } from '@angular/material';

import { StationComponent } from './station.component';

import { MockComponent } from 'ng2-mock-component';

describe('StationComponent', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatExpansionModule
      ],
      declarations: [
        StationComponent,

        MockComponent({selector: 'shared-mmi', inputs: ['intensity']}) ]
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
