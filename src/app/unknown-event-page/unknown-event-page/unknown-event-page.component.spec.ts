import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng2-mock-component';

import { UnknownEventPageComponent } from './unknown-event-page.component';


describe('UnknownEventPageComponent', () => {
  let component: UnknownEventPageComponent;
  let fixture: ComponentFixture<UnknownEventPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        UnknownEventPageComponent,

        MockComponent({selector: 'app-hazdev-template', inputs: ['TITLE']}),
        MockComponent({selector: 'app-navigation-group'}),
        MockComponent({selector: 'app-navigation-item', inputs: ['display', 'navHrefLink', 'navRouterLink']}),

        MockComponent({selector: 'event-page-footer', inputs: ['event', 'contributors']}),
        MockComponent({selector: 'mat-nav-list'}),
        MockComponent({selector: 'tell-us-tell-us'})
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
