import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';

import { OriginComponent } from './origin.component';
import { MockComponent } from 'ng2-mock-component';


describe('OriginComponent', () => {
  let component: OriginComponent;
  let fixture: ComponentFixture<OriginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OriginComponent,

        MockComponent({selector: 'product-page', inputs: ['productType']})
      ],
      imports: [
        MatTabsModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
