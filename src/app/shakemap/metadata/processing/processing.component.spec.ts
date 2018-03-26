import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatExpansionModule } from '@angular/material';

import { ProcessingComponent } from './processing.component';
import { FormatterService } from '../../../core/formatter.service';

import { MockPipe } from '../../../mock-pipe';

describe('ProcessingComponent', () => {
  let component: ProcessingComponent;
  let fixture: ComponentFixture<ProcessingComponent>;

  beforeEach(async(() => {

    const formatter = {};

    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatExpansionModule
      ],
      declarations: [
        ProcessingComponent,

        MockPipe('sharedDateTime')
        ],
      providers: [
        {provide: FormatterService, useValue: formatter}
      ]
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
