import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ImpactComponent } from './impact.component';
import { MockComponent } from 'ng2-mock-component';

describe('ImpactComponent', () => {
  let component: ImpactComponent;
  let fixture: ComponentFixture<ImpactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ImpactComponent,

        MockComponent({selector: 'app-impact-dyfi-summary'}),
        MockComponent({selector: 'app-impact-pager-summary'}),
        MockComponent({selector: 'app-impact-shakemap-summary'})
      ],
      imports: [
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImpactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
