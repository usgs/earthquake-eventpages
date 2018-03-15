import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule,
          MatExpansionModule,
          MatTableModule } from '@angular/material';

import { StationComponent } from './station.component';

import { MockComponent } from 'ng2-mock-component';

import { MockPipe } from '../../mock-pipe';

describe('StationComponent', () => {
  let component: StationComponent;
  let fixture: ComponentFixture<StationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatExpansionModule,
        MatTableModule
      ],
      declarations: [
        StationComponent,

        MockPipe('sharedDegrees'),
        MockComponent({selector: 'shared-mmi', inputs: ['intensity']})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('getAmp', () => {

    it('handles pga request', () => {

      const test_amps = [{'name': 'pga'}, {'name': 'pgv'}];
      const amp = component.getAmp('pga', test_amps);

      expect(amp.name).toEqual('pga');

    });

    it('handles older shakemap data', () => {

      const test_amps = [{'name': 'psa(0.3)'}, {'name': 'pgv'}];
      const amp = component.getAmp('psa03', test_amps);

      expect(amp.name).toEqual('psa(0.3)');

    });

    it('handles missing amplitude', () => {

      const test_amps = [{'name': 'psa(0.3)'}, {'name': 'pgv'}];
      const amp = component.getAmp('pga', test_amps);

      expect(amp.value).toEqual(null);

    });
  });
});
