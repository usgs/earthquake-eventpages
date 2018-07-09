import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaveformsComponent } from './waveforms.component';

describe('WaveformsComponent', () => {
  let component: WaveformsComponent;
  let fixture: ComponentFixture<WaveformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaveformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
