import { API } from 'homebridge';
import { accessories } from './accessory';

/**
 * Registers the accessories with Homebridge
 */
export = (api: API) => {
  accessories.forEach((accessory) => {
    api.registerAccessory(accessory.name, accessory.accessoryConstructor);
  });
};
