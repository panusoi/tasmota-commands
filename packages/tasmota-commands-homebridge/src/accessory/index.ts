import { AccessoryPluginConstructor } from 'homebridge';
import TasmotaSimpleLightBulbAccessory, {
  TASMOTA_SIMPLE_LIGHT_BULB_NAME,
} from './simple-light-bulb/simple-light-bulb-accessory';

type Accessory = {
  name: string;
  accessoryConstructor: AccessoryPluginConstructor;
};

export const accessories: Accessory[] = [
  {
    name: TASMOTA_SIMPLE_LIGHT_BULB_NAME,
    accessoryConstructor: TasmotaSimpleLightBulbAccessory,
  },
];
