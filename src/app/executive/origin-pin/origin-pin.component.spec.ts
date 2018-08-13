import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { FormatterService } from '../../core/formatter.service';
import { Event } from '../../event';
import { MockPipe } from '../../mock-pipe';
import { OriginPinComponent } from './origin-pin.component';

describe('OriginPinComponent', () => {
  let component: OriginPinComponent;
  let fixture: ComponentFixture<OriginPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OriginPinComponent,

        MockComponent({
          selector: 'basic-pin',
          inputs: ['footer', 'link', 'product', 'title']
        }),
        MockPipe('sharedNumber')
      ],
      imports: [RouterTestingModule],
      providers: [{ provide: FormatterService, useValue: {} }]
    }).compileComponents();
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
