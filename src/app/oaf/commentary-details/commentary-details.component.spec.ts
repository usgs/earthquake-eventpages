import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from '../../mock-pipe';

import { CommentaryDetailsComponent } from './commentary-details.component';

describe('CommentaryDetailsComponent', () => {
  let component: CommentaryDetailsComponent;
  let fixture: ComponentFixture<CommentaryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentaryDetailsComponent,

        MockPipe('oafPercent'),
        MockPipe('sharedNumberWithSeparator'),
        MockPipe('sharedRoundDown'),
        MockPipe('sharedRoundUp'),
        MockPipe('sharedSignificantFigure')
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentaryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
