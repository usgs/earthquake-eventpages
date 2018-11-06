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
  const newData = data;
  let properties = null;

  if (!newData) {
    return null;
  }
  try {
    // set the products object for iteration
    properties = newData.properties.products;
    Object.keys(properties).forEach(key => {
      // look for -scenario in property name
      const index = key.indexOf('-scenario');
      if (index !== -1) {
        // strip out the -scenario from property name
        const propValue = key.substr(0, index);
        properties[propValue] = properties[key];
        delete properties[key];

        if (properties[propValue][0].type) {
          properties[propValue][0].type = propValue;
        }
      } else {
        return;
      }
    });
    return newData;
  } catch (e) {
    return null;
  }
}

/**
 * Child class for scenario events, returns a new event object and calls on
 * the parent Event constructor
 */
export class ScenarioEvent extends Event {
  constructor(data: any) {
    const newData = transformEvent(data);
    super(newData);
  }
}
