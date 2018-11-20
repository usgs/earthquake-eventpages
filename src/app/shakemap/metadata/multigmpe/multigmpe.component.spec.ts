import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule, MatExpansionModule } from '@angular/material';

import { MockPipe } from '../../../mock-pipe';
import { MultiGmpeComponent } from './multigmpe.component';

describe('MultiGmpeComponent', () => {
  let component: MultiGmpeComponent;
  let fixture: ComponentFixture<MultiGmpeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MockPipe('sharedNumber'),
        MultiGmpeComponent
      ],
      imports: [
        MatExpansionModule,
        MatTableModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiGmpeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
