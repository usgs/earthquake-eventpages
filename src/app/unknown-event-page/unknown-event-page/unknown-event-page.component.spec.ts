import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockComponent } from 'ng2-mock-component';

import { UnknownEventPageComponent } from './unknown-event-page.component';

describe('UnknownEventPageComponent', () => {
  let component: UnknownEventPageComponent;
  let fixture: ComponentFixture<UnknownEventPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UnknownEventPageComponent,

        MockComponent({selector: 'app-hazdev-template', inputs: ['TITLE']}),
        MockComponent({selector: 'app-navigation-group'}),
        MockComponent({selector: 'app-navigation-item', inputs: ['display', 'navHrefLink', 'navRouterLink']}),

        MockComponent({selector: 'mat-nav-list'})
      ]
    })
    .compileComponents();
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
