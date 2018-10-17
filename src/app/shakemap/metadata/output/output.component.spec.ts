import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatExpansionModule } from '@angular/material';

import { FormatterService } from '@core/formatter.service';
import { MockPipe } from '../../../mock-pipe';
import { OutputComponent } from './output.component';

describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;

  beforeEach(async(() => {
    const formatter = {};

    TestBed.configureTestingModule({
      declarations: [
        OutputComponent,

        MockPipe('sharedDegrees'),
        MockPipe('sharedNumber'),
        MockPipe('sharedUnits'),
        MockPipe('convertCharacter')
      ],
      imports: [MatTableModule, MatExpansionModule],
      providers: [{ provide: FormatterService, useValue: formatter }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
