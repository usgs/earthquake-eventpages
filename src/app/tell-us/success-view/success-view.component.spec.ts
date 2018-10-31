import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowRef } from '@shared/window-ref-wrapper';

import { SuccessViewComponent } from './success-view.component';

declare let window: any;

describe('SuccessViewComponent', () => {
  const nativeWindowRef = new WindowRef();

  let component: SuccessViewComponent;
  let fixture: ComponentFixture<SuccessViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessViewComponent],
      providers: [{ provide: WindowRef, useValue: nativeWindowRef }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessViewComponent);
    component = fixture.componentInstance;
    component.success = {};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls showFacebookPopup and ensures FB.ui is called', () => {
    component.sdkStatus = true;
    component.success = {
      your_cdi: null
    };
    window.FB = {
      ui: jasmine.createSpy().and.returnValue(null)
    };
    component.showFacebookSharePopup();
    expect(window.FB.ui).toHaveBeenCalled();
  });

  it('sets meta tags on component', () => {
    const metaUrl = component.meta.getTag('property="og:url"').content;
    const metaType = component.meta.getTag('property="og:type"').content;
    const metaTitle = component.meta.getTag('property="og:title"').content;
    expect(metaUrl).toEqual(component._windowHref);
    expect(metaType).toEqual('website');
    expect(metaTitle).toEqual('');
  });

  it('calls share popup on social click', () => {
    spyOn(component, 'showFacebookSharePopup');
    const event = {
      preventDefault: function() {}
    };
    component.onSocialClick(event);
    expect(component.showFacebookSharePopup).toHaveBeenCalled();
  });
});
