import { Event } from './event';

function transformEvent(data: any) {
  const newData = data;
  let properties = null;

  if (!newData) {
    return null;
  }
  try {
    properties = newData.properties.products;
    Object.keys(properties).forEach(key => {
      const index = key.indexOf('-scenario');
      if (index !== -1) {
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

export class ScenarioEvent extends Event {
  constructor(data: any) {
    const newData = transformEvent(data);
    super(newData);
  }
}
