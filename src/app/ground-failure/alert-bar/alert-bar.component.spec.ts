import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from '../../mock-pipe';
import { AlertBarComponent } from './alert-bar.component';

describe('AlertBarComponent', () => {
  let component: AlertBarComponent;
  let fixture: ComponentFixture<AlertBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlertBarComponent, MockPipe('getBarPosition')]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
