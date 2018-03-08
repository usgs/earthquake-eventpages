import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterTestingModule } from '@angular/router/testing';

import { ShakemapComponent } from './shakemap.component';
import { MockComponent } from 'ng2-mock-component';

describe('ShakemapComponent', () => {
  let component: ShakemapComponent;
  let fixture: ComponentFixture<ShakemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ShakemapComponent,
      
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
    fixture = TestBed.createComponent(ShakemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
