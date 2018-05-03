import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';

import { OafComponent } from './oaf.component';
import { MockComponent } from 'ng2-mock-component';


describe('OafComponent', () => {
  let component: OafComponent;
  let fixture: ComponentFixture<OafComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        OafComponent,

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
    fixture = TestBed.createComponent(OafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
