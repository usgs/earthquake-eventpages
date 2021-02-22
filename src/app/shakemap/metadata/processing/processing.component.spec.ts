import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';

import { FormatterService } from '@core/formatter.service';
import { MockPipe } from '../../../mock-pipe';
import { ProcessingComponent } from './processing.component';

describe('ProcessingComponent', () => {
  let component: ProcessingComponent;
  let fixture: ComponentFixture<ProcessingComponent>;

  beforeEach(async(() => {
    const formatter = {};

    TestBed.configureTestingModule({
      declarations: [ProcessingComponent, MockPipe('sharedDateTime')],
      imports: [MatTableModule, MatExpansionModule],
      providers: [{ provide: FormatterService, useValue: formatter }]
    }).compileComponents();
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
