import { getUnique } from './unique';

export class Event {

  // "feature" properties
  public id: string;
  public properties: any;
  public geometry: any;

  public product: any = null;
  public sources: Array<string>;


  constructor(
    public data: any
  ) {
    let id;
    let geometry;
    let properties;
    let sources;

    try {
      id = this.data.id;
    } catch (e) {
      id = null;
    }
    this.id = id;

    try {
      geometry = this.data.geometry || null;
    } catch (e) {
      geometry = null;
    }
    this.geometry = geometry;

    try {
      properties = this.data.properties || {};
    } catch (e) {
      properties = {};
    }
    this.properties = properties;

    try {
      sources = this.data.properties.sources.split(',');
    } catch (e) {
      sources = [];
    }
    this.sources = getUnique(sources);
    this.sources.sort();
  }

  /**
   * Return first matching product of given type.
   *
   * @param type type of product.
   * @param source source of product.
   * @param code code of product.
   */
  getProduct(type: string, source?: string, code?: string): any {
    let products;

    if (!type) {
      return;
    }

    try {
      products = this.properties.products[type];
    } catch (e) {
      return;
    }

    return products.find((product) => {
      if ((source && product.source !== source) ||
          (code && product.code !== code)) {
        return false;
      }
      return true;
    });
  }

}
