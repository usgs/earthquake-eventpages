import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';
import { ShakemapPinComponent } from './shakemap-pin.component';

describe('ShakemapPinComponent', () => {
  let component: ShakemapPinComponent;
  let fixture: ComponentFixture<ShakemapPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShakemapPinComponent,
        MockComponent({
          inputs: ['link', 'product', 'title'],
          selector: 'basic-pin'
        }),
        MockComponent({
          inputs: ['bubble', 'intensity'],
          selector: 'shared-mmi'
        }),

        MockPipe('getProduct'),
        MockPipe('sharedProductContent'),
        MockPipe('sharedProductProperty')
      ],
    imports: [
      RouterTestingModule
    ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShakemapPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getDescription', () => {
    it('handles "--"', () => {
      const result = component.getDescription('--');

      expect(result).toBe(component.mmiDescription[0]);
    });

    it('handles "-"', () => {
      const result = component.getDescription('--');

      expect(result).toBe(component.mmiDescription[0]);
    });

    it('handles mmi (round up)', () => {
      const mmi = 4.67;
      const result = component.getDescription(mmi);

      expect(result).toBe(component.mmiDescription[5]);
    });

    it('handles mmi (round down)', () => {
      const mmi = 4.44;
      const result = component.getDescription(mmi);

      expect(result).toBe(component.mmiDescription[4]);
    });

    it('handles null', () => {
      const result = component.getDescription(null);
      expect(result).toBe(component.mmiDescription[0]);
    });

    it('returns null for unexpected values', () => {
      const result = component.getDescription('BAD_DESCRIPTION');
      expect(result).toBeNull();
    });
  });

});
