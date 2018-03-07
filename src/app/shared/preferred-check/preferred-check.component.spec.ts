import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreferredCheckComponent } from './preferred-check.component';
import { MatIconModule } from '@angular/material';

describe('PreferredCheckComponent', () => {
  let component: PreferredCheckComponent;
  let fixture: ComponentFixture<PreferredCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule
      ],
      declarations: [
        PreferredCheckComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreferredCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
