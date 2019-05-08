import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeComponent } from './shape.component';

describe('ShapeComponent', () => {
  let component: ShapeComponent;
  let fixture: ComponentFixture<ShapeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShapeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('shape', () => {
    it('sets', () => {
      component.shape = 'circle';
      expect(component._shape).toBe('circle');
      expect(component.shape).toBe('circle');
    });

    it('sets path and transform when "triangle"', () => {
      component.shape = 'triangle';
      expect(component.path).toBeTruthy();
      expect(component.transform).toBeTruthy();
    });
  });
});
