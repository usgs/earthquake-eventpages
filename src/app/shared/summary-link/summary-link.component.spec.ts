import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockPipe } from '../../mock-pipe';

import { SummaryLinkComponent } from './summary-link.component';

describe('SummaryLinkComponent', () => {
  let component: SummaryLinkComponent;
  let fixture: ComponentFixture<SummaryLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SummaryLinkComponent, MockPipe('sharedSummaryLink')],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
