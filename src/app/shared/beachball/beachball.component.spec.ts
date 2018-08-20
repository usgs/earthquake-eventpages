import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Beachball } from './beachball';
import { BeachballComponent } from './beachball.component';
import { Tensor } from './tensor';

describe('BeachballComponent', () => {
  let component: BeachballComponent;
  let fixture: ComponentFixture<BeachballComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BeachballComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeachballComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('when tensor changes, render beachball', () => {
      spyOn(Beachball, 'render').and.returnValue(false);

      // does not render when falsy
      component.tensor = null;
      component.ngOnChanges();
      expect(Beachball.render).not.toHaveBeenCalled();
      // renders otherwise
      component.tensor = new Tensor({});
      component.ngOnChanges();
      expect(Beachball.render).toHaveBeenCalled();
    });
  });
});
