import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseComponent } from './response.component';
import { MockPipe } from 'app/mock-pipe';
import { MockComponent } from 'ng2-mock-component';
import { WindowRef } from '@shared/window-ref-wrapper';

declare let window: any;

describe('ResponseComponent', () => {
  const nativeWindowRef = new WindowRef();

  let component: ResponseComponent;
  let fixture: ComponentFixture<ResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ResponseComponent,
        MockComponent({
          inputs: ['bubble', 'intensity', 'value'],
          selector: 'shared-mmi'
        }),
        MockPipe('sharedRomanToNumber')
      ],
      providers: [{ provide: WindowRef, useValue: nativeWindowRef }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calls showFacebookPopup and ensures FB.ui is called', () => {
    component.sdkStatus = true;
    component.response = {
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
