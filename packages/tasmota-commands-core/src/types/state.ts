export type TasmotaState = Partial<{
  Time: string;
  Uptime: string;
  UptimeSec: number;
  POWER: 'ON' | 'OFF' | 0 | 1;
  Dimmer: number;
  CT: number;
  Color: string;
  HSBColor: string;
  White: number;
}>;
