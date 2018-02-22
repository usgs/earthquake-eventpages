import { async, ComponentFixture, TestBed, getTestBed } from '@angular/core/testing';

import { TextProductComponent } from './text-product.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('TextProductComponent', () => {
  let component: TextProductComponent;
  let fixture: ComponentFixture<TextProductComponent>;
  let httpClient: HttpTestingController;
  let injector: TestBed;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        TextProductComponent
      ]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  }));

  afterEach(() => {
    httpClient.verify();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(TextProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('set product', () => {
    it('can get same value', () => {
      const product = {test: 'value'};
      spyOn(component, 'getContent').and.returnValue(null);
      component.product = product;
      expect(component.product).toEqual(product);
    });

    it('calls getContent()', () => {
      spyOn(component, 'getContent').and.returnValue(null);
      component.product = null;
      expect(component.getContent).toHaveBeenCalled();
    });
  });

  describe('getContent()', () => {
    it('uses bytes content when set', () => {
      component.product = {
        contents: {
          '': {
            bytes: 'test content'
          }
        }
      };

      component.content$.subscribe( (content) => {
        expect(content).toEqual('test content');
      });
    });

    it('uses contentPath', () => {
      component.contentPath = 'test path';
      component.product = {
        contents: {
          '': {
            bytes: 'test content'
          },
          'test path': {
            bytes: 'test path content'
          }
        }
      };
      component.content$.subscribe( (content) => {
        expect(content).toEqual('test path content');
      });
    });

    it('handles success', () => {
      const response = 'test response';

      component.product = {
        contents: {
          '': {
            url: 'url'
          }
        }
      };

      const request = httpClient.expectOne('url');
      request.flush(response);
      component.content$.subscribe( (content) => {
        expect(content).toEqual(response);
      });
    });

    it('handles failure', () => {
      component.product = {
        contents: {
          '': {
            url: 'url'
          }
        }
      };

      const request = httpClient.expectOne('url');
      request.flush('', {status: 500, statusText: 'Error'});

      component.content$.subscribe((content) => {
        expect(content).toEqual(null);
        expect(component.error).toBeTruthy();
      });
    });

    it('pushes null for bad usage', () => {
      component.product = {
        contents: {
          '': {}
        }
      };

      component.content$.subscribe((content) => {
        expect(content).toEqual(null);
        expect(component.error).toEqual(new Error('no content bytes or url'));
      });
    });
  });

  describe('replaceRelativePaths()', () => {
    it('handles undefined product', () => {
      component.product = '';
      expect(() => {
        component.replaceRelativePaths('test content');
      }).not.toThrowError();
    });

    it('replaces urls', () => {
      const product = {
        contents: {
          'abc': {
            url: 'abcurl'
          }
        }
      };
      component.product = product;
      expect(component.replaceRelativePaths('<a href="abc">text</a>'))
          .toEqual('<a href="abcurl">text</a>');
      // leaves unquoted content unchanged
      expect(component.replaceRelativePaths('<a href="other">abc</a>'))
          .toEqual('<a href="other">abc</a>');
    });

    it('ignores empty content', () => {
      const product = {
        contents: {
          '': {
            url: 'emptyurl'
          },
          'abc': {
            url: 'abcurl'
          }
        }
      };
      spyOn(component, 'getContent').and.returnValue({});
      component.product = product;
      expect(component.replaceRelativePaths('<a href="">text</a>'))
          .toEqual('<a href="">text</a>');

    });
  });

});
