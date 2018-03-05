import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomPanelComponent } from './bottom-panel.component';

describe('BottomPanelComponent', () => {
  let component: BottomPanelComponent;
  let fixture: ComponentFixture<BottomPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
