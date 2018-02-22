import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkProductComponent } from './link-product.component';

describe('LinkProductComponent', () => {
  let component: LinkProductComponent;
  let fixture: ComponentFixture<LinkProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getText()', () => {
    it('gets the text product property', () => {
      const product = {
        properties: {
          text: 'test text'
        }
      };
      expect(component.getText(product)).toEqual(product.properties.text);
    });

    it('returns "no text" if product not defined', () => {
      expect(component.getText(null)).toEqual('no text');
    });
  });

  describe('getUrl()', () => {
    it('gets the url property', () => {
      const product = {
        properties: {
          url: 'url'
        },
        contents: {}
      };

      expect(component.getUrl(product)).toEqual('url');
    });

    it('supports relative urls', () => {
      const product = {
        properties: {
          url: 'relative url'
        },
        contents: {
          'relative url': {
            url: 'actual url'
          }
        }
      };

      expect(component.getUrl(product)).toEqual('actual url');
    });
  });

});
