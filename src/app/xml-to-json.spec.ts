import { xmlToJson } from './xml-to-json';


describe('xmlToJson', () => {

  it('parses xml strings', () => {
    const json = xmlToJson(`<?xml version="1.0"?>
      <root xmlns="something">
        <child-element attribute="attribute value">
          child element text
        </child-element>
      </root>
    `);

    expect(json).toBeTruthy();
    expect(json.root).toBeTruthy();
    expect(json.root['child-element']['attribute']).toEqual('attribute value');
    expect(json.root['child-element']['#text'].trim()).toEqual('child element text');
  });

  it('parses without xml declaration', () => {
    const json = xmlToJson(`
      <root xmlns="something">
        <child-element attribute="attribute value">
          child element text
        </child-element>
      </root>
    `);

    expect(json).toBeTruthy();
    expect(json.root).toBeTruthy();
    expect(json.root['child-element']['attribute']).toEqual('attribute value');
    expect(json.root['child-element']['#text'].trim()).toEqual('child element text');
  });

  it('converts multiple child-elements with the same name to array', () => {
    const json = xmlToJson(`
      <root xmlns="something">
        <child-element attribute="value1"></child-element>
        <child-element attribute="value2"></child-element>
        <child-element attribute="value3"></child-element>
      </root>
    `);

    expect(json).toBeTruthy();
    expect(json.root).toBeTruthy();
    expect(json.root['child-element']).toEqual([
      {attribute: 'value1'},
      {attribute: 'value2'},
      {attribute: 'value3'}
    ]);
  });

  it('converts text-only elements to strings', () => {
    const json = xmlToJson(`
      <root xmlns="something">
        <child-element>
          some text here
        </child-element>
      </root>
    `);

    expect(json).toBeTruthy();
    expect(json.root).toBeTruthy();
    expect(json.root['child-element'].trim()).toEqual('some text here');
  });
});
