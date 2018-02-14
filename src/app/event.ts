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
    let sources;

    if (!this.data) {
      this.geometry = null;
      this.id = null;
      this.properties = {};
      this.sources = [];
      return;
    }

    this.geometry = this.data.geometry || null;
    this.id = this.data.id || null;
    this.properties = this.data.properties || {};

    sources = (this.properties.sources || '').split(',');
    sources = getUnique(sources);
    sources.sort();
    this.sources = sources;
  }

  /**
   * Return first matching product of given type.
   *
   * @param type type of product.
   * @param source source of product.
   * @param code code of product.
   */
  getProduct(type: string, source?: string, code?: string): any {
    return this.getProducts(type).find((product) => {
      if ((source && product.source !== source) ||
          (code && product.code !== code)) {
        return false;
      }
      return true;
    });
  }

  /**
   * Return all products of given type.
   *
   * @param type type of product.
   */
  getProducts(type: string): Array<any> {
    let products;

    if (!type) {
      return [];
    }

    try {
      products = this.properties.products[type] || [];
    } catch (e) {
      products = [];
    }

    return products;
  }

}
