import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';
import { MockComponent } from 'ng2-mock-component';

import { FormatterService } from '../../core/formatter.service';
import { Event } from '../../event';
import { OriginPinComponent } from './origin-pin.component';
import { MockPipe } from '../../mock-pipe';


describe('OriginPinComponent', () => {
  let component: OriginPinComponent;
  let fixture: ComponentFixture<OriginPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OriginPinComponent,

        MockComponent({
          selector: 'basic-pin',
          inputs: [
            'action',
            'link',
            'product',
            'subtitle',
            'title'
          ]
        }),
        MockPipe('sharedNumber')
      ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: FormatterService, useValue: {} }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
