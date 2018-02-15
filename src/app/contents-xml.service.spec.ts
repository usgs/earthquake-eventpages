import { TestBed, getTestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContentsXmlService } from './contents-xml.service';


describe('ContentsXmlService', () => {
  let httpClient: HttpTestingController,
      injector: TestBed;

  // Sample product to process
  // Note: file1.json does not exist in PRODUCT, this is on purpose
  const PRODUCT = {
    contents: {
      'contents.xml': {url: 'url'},
      'file1.xml': {url: 'url/path/file1.xml', length: 0},
      'file2.txt': {url: 'url/path/file2.txt', length: 2}
    }
  };

  // Sample XML to parse
  const CONTENTS_XML = [
    '<?xml version="1.0"?>',
    '<contents xmlns="http://earthquake.usgs.gov/earthquakes/event/contents">',
      '<file id="file1" title="File One">',
        '<caption>File One Caption</caption>',
        '<format type="xml" href="file1.xml"/>',
        '<format type="json" href="file1.json"/>',
      '</file>',
      '<file id="file2" title="File Two">',
        '<format type="txt" href="file2.txt"/>',
      '</file>',
    '</contents>'
  ].join('');

  // Expected parsed data structure
  const CONTENTS_JSON = [
    {
      id: 'file1',
      title: 'File One',
      caption: 'File One Caption',
      formats: [
        {href: 'file1.xml', type: 'xml', url: 'url/path/file1.xml', length: 0},
        {href: 'file1.json', type: 'json', url: undefined, length: undefined},
      ]
    },
    {
      id: 'file2',
      title: 'File Two',
      caption: '',
      formats: [
        {href: 'file2.txt', type: 'txt', url: 'url/path/file2.txt' length: 2}
      ]
    }
  ];


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        ContentsXmlService
      ]
    });

    injector = getTestBed();
    httpClient = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpClient.verify();
  });


  it('should be created',
      inject([ContentsXmlService], (service: ContentsXmlService) => {
    expect(service).toBeTruthy();
  }));

  describe('get', () => {
    it('handles success',
        inject([ContentsXmlService], (service: ContentsXmlService) => {
      const response = '';

      spyOn(service, 'parseResponse').and.returnValue([]);
      service.get(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush(response);

      expect(service.parseResponse).toHaveBeenCalled();
      const args = service.parseResponse.calls.argsFor(0);
      expect(args[0]).toEqual(response);
    }));

    it('handles failure',
        inject([ContentsXmlService], (service: ContentsXmlService) => {

      service.get(PRODUCT);
      const request = httpClient.expectOne('url');
      request.flush('', {status: 500, statusText: 'Error'});

      service.contents$.subscribe((content) => {
        expect(content).toEqual([]);
      });
    }));

    it('pushes null for bad usage',
        inject([ContentsXmlService], (service: ContentsXmlService) => {


      service.get(null);
      service.contents$.subscribe((parsed) => {
        expect(parsed).toBe(null);
      });
    }));
  });

  describe('parseFile', () => {
    it('calls parseFormat',
        inject([ContentsXmlService], (service: ContentsXmlService) => {

      const xml = new DOMParser().parseFromString(CONTENTS_XML, 'text/xml');
      const file = xml.querySelector('contents > file');

      spyOn(service, 'parseFormat').and.returnValue({});
      service.parseFile(file, PRODUCT);

      expect(service.parseFormat).toHaveBeenCalled();
      expect(service.parseFormat.calls.count()).toBe(2);
    }));

    it('properly parses',
        inject([ContentsXmlService], (service: ContentsXmlService) => {

      const xml = new DOMParser().parseFromString(CONTENTS_XML, 'text/xml');
      const file = xml.querySelector('contents > file');

      const parsed = service.parseFile(file, PRODUCT);

      expect(parsed).toEqual(CONTENTS_JSON[0]);
    }));

    it('throws errors for refid',
        inject([ContentsXmlService], (service: ContentsXmlService) => {

      const xml = new DOMParser().parseFromString(CONTENTS_XML, 'text/xml');
      const file = xml.querySelector('contents > file');
      file.setAttribute('refid', 'refid');

      expect(
        () => {service.parseFile(file);}
      ).toThrow(new Error('file element with refid'));
    }));

    it('properly parses',
        inject([ContentsXmlService], (service: ContentsXmlService) => {

      const xml = new DOMParser().parseFromString(CONTENTS_XML, 'text/xml');
      const file = xml.querySelector('contents > file');

      const parsed = service.parseFile(file, PRODUCT);

      expect(parsed).toEqual(CONTENTS_JSON[0]);
    }))
  });

  describe('parseFormat', () => {
    it('properly parses',
        inject([ContentsXmlService], (service: ContentsXmlService) => {

      const xml = new DOMParser().parseFromString(CONTENTS_XML, 'text/xml');
      const format = xml.querySelector('contents > file > format');

      const parsed = service.parseFormat(format, PRODUCT);

      expect(parsed).toEqual(CONTENTS_JSON[0].formats[0]);
    }));

    it('returns undefined on error',
        inject([ContentsXmlService], (service: ContentsXmlService) => {

      const parsed = service.parseFormat(null, PRODUCT);

      expect(parsed).toBe(undefined);
    }));
  });

  describe('parseResponse', () => {
    it('calls parseFile',
        inject([ContentsXmlService], (service: ContentsXmlService) => {

      spyOn(service, 'parseFile').and.returnValue({});
      service.parseResponse(CONTENTS_XML, PRODUCT);

      expect(service.parseFile).toHaveBeenCalled();
      expect(service.parseFile.calls.count()).toBe(2);
    }));

    it('properly parses',
        inject([ContentsXmlService], (service: ContentsXmlService) => {
      const parsed = service.parseResponse(CONTENTS_XML, PRODUCT);

      expect(parsed).toEqual(CONTENTS_JSON);
    }))
  });
});
