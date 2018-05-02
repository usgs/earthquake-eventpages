import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';

import { MockComponent } from 'ng2-mock-component';

import { DyfiComponent } from './dyfi.component';

describe('DyfiComponent', () => {
  let component: DyfiComponent;
  let fixture: ComponentFixture<DyfiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTabsModule,
        RouterTestingModule
      ],
      declarations: [
        DyfiComponent,

        MockComponent({selector: 'product-page', inputs: ['productType']})
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DyfiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
