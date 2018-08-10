import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatExpansionModule } from '@angular/material';

import { MockPipe } from '../../../mock-pipe';

import { FormatterService } from '../../../core/formatter.service';
import { OutputComponent } from './output.component';


describe('OutputComponent', () => {
  let component: OutputComponent;
  let fixture: ComponentFixture<OutputComponent>;

  beforeEach(async(() => {

    const formatter = {};

    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatExpansionModule
      ],
      declarations: [
        OutputComponent,

        MockPipe('sharedDegrees'),
        MockPipe('sharedNumber'),
        MockPipe('sharedUnits')
      ],
      providers: [
        {provide: FormatterService, useValue: formatter}
      ]
    })
    .compileComponents();
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
