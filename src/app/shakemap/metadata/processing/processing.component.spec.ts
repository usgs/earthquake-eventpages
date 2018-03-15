import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatExpansionModule } from '@angular/material';

import { ProcessingComponent } from './processing.component';

describe('ProcessingComponent', () => {
  let component: ProcessingComponent;
  let fixture: ComponentFixture<ProcessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatExpansionModule
      ],
      declarations: [ ProcessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
