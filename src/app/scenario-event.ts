import { Event } from './event';

/**
 * This function will iterate through the products object and return a new
 * object with the -scenario stripped out from the productname-scenario
 * property
 *
 * @param data
 *      The scenario event data
 */
function transformEvent(data: any) {
  if (!data || !data.properties || !data.properties.products) {
    return data;
  }

  const newProducts = {};
  const products = data.properties.products;
  Object.keys(products).forEach(type => {
    const newType = type.replace('-scenario', '');

    newProducts[newType] = products[type];
    if (newType !== type) {
      newProducts[newType].forEach(product => {
        product.type = newType;
      });
    }
  });
  data.properties.products = newProducts;
  return data;
}

/**
 * Child class for scenario events, returns a new event object and calls on
 * the parent Event constructor
 */
export class ScenarioEvent extends Event {
  constructor(data: any) {
    const newData = transformEvent(data);
    super(newData, 'scenario');
  }
}
