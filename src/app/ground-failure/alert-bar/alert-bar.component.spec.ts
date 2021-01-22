import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockPipe } from '../../mock-pipe';
import { AlertBarComponent } from './alert-bar.component';

describe('AlertBarComponent', () => {
  let component: AlertBarComponent;
  let fixture: ComponentFixture<AlertBarComponent>;

  const BINS = [
    {
      color: '#27a83c',
      max: 1,
      min: 0,
      text: 'Little or no'
    },
    {
      color: '#e5e514',
      max: 10,
      min: 1,
      text: 'Limited'
    }
  ];

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

  describe('bins', () => {
    it('should set maxBin and minBin', () => {
      component.bins = BINS;

      expect(component.maxBin).toBe(10);
      expect(component.minBin).toBe(0);
    });

    it('should set _bins', () => {
      component.bins = BINS;

      expect(component._bins).toBe(BINS);
    });

    it('should retrieve _bins', () => {
      component.bins = BINS;

      expect(component.bins).toBe(component._bins);
    });
  });
});
