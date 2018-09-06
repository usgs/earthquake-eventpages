import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';

import { UnknownEventPageComponent } from './unknown-event-page.component';

describe('UnknownEventPageComponent', () => {
  let component: UnknownEventPageComponent;
  let fixture: ComponentFixture<UnknownEventPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UnknownEventPageComponent,

        MockComponent({
          inputs: ['TITLE'],
          selector: 'hazdev-template'
        }),
        MockComponent({ selector: 'hazdev-template-navigation-group' }),
        MockComponent({
          inputs: ['display', 'navHrefLink', 'navRouterLink'],
          selector: 'hazdev-template-navigation-item'
        }),

        MockComponent({
          inputs: ['event', 'contributors'],
          selector: 'event-page-footer'
        }),
        MockComponent({ selector: 'mat-nav-list' }),
        MockComponent({ selector: 'tell-us-tell-us' })
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
