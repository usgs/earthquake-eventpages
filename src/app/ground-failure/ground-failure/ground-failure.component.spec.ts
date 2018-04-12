import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';
import { of } from 'rxjs/observable/of';

import { EventService } from '../../core/event.service';

import { GroundFailureComponent } from './ground-failure.component';

describe('GroundFailureComponent', () => {
  let component: GroundFailureComponent;
  let fixture: ComponentFixture<GroundFailureComponent>;

  beforeEach(async(() => {
    const eventServiceStub = {
      product$: of({})
    };

    TestBed.configureTestingModule({
      declarations: [
        GroundFailureComponent,

        MockComponent({selector: 'product-page', inputs: ['productType']})
      ],
      imports: [
        MatTabsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: EventService, useValue: eventServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
