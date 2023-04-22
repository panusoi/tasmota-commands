type PowerOff = 0 | 'off' | 'false' | false;

type PowerOn = 1 | 'on' | 'true' | true;

type PowerToggle = 2 | 'toggle';

type PowerBlink = 3 | 'blink';

type PowerBlinkOff = 4 | 'blinkoff';

export type Power0Value = PowerOff | PowerOn | PowerToggle;

export type PowerXValue = PowerOff | PowerOn | PowerToggle | PowerBlink | PowerBlinkOff;
