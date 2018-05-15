import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { MockComponent } from 'ng2-mock-component';

import { EventService } from '../../core/event.service';
import { OafService } from '../oaf.service';

import { OafComponent } from './oaf.component';


describe('OafComponent', () => {
  let component: OafComponent;
  let fixture: ComponentFixture<OafComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of(null)
    };
    const oafServiceStub = {
      getOaf: (product: any) => null
    };

    TestBed.configureTestingModule({
      declarations: [
        OafComponent,

        MockComponent({selector: 'product-page', inputs: ['productType']})
      ],
      imports: [
        MatTabsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub},
        {provide: OafService, useValue: oafServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onProduct', () => {
    it('guards against non-oaf products', () => {
      const getOafSpy = spyOn(component.oafService, 'getOaf');
      const oafProduct = {type: 'oaf'};

      component.onProduct(null);
      component.onProduct({});
      component.onProduct({type: 'not-an-oaf'});

      expect(getOafSpy).not.toHaveBeenCalled();

      component.onProduct(oafProduct);
      expect(getOafSpy).toHaveBeenCalledWith(oafProduct);
    });
  });
});
