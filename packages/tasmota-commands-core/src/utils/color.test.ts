import { isColorPreset, isRGB, isHexColor, isHSB } from './color';

describe('Color utils', () => {
  describe('type guards', () => {
    test('isColorPreset', () => {
      const valid = [1, 12, '+', '-'];
      const invalid = [0, {}, null, undefined, [], () => true, '255,255,255', '#ffffff'];

      expect(valid.filter((v) => !isColorPreset(v))).toMatchInlineSnapshot(`[]`);
      expect(invalid.filter((v) => isColorPreset(v))).toMatchInlineSnapshot(`[]`);
    });

    test('isRGB', () => {
      const valid = ['0,0,0', '100,100,100', '255,255,255', '0,255,255'];
      const invalid = [
        0,
        {},
        null,
        undefined,
        [],
        () => true,
        '+',
        '#ffffff',
        '255,255,-1',
        '255,-1,255',
        '-1,255,255',
        '255,255,256',
        '255,256,255',
        '256,255,255',
        'ff,255,255',
      ];

      expect(valid.filter((v) => !isRGB(v))).toMatchInlineSnapshot(`[]`);
      expect(invalid.filter((v) => isRGB(v))).toMatchInlineSnapshot(`[]`);
    });

    test('isHexColor', () => {
      const valid = ['#ff00', '#ff00ff', '#ff00ff00', '#ff00ff00ff', '#ff=', '#ff00=', '#ff0='];
      const invalid = [
        0,
        {},
        null,
        undefined,
        [],
        () => true,
        '+',
        '255,255,255',
        '#ff0',
        '#ff000',
        '#ff00ff0',
        '#ff00ff00ff0',
        '#ff=00',
      ];

      expect(valid.filter((v) => !isHexColor(v))).toMatchInlineSnapshot(`[]`);
      expect(invalid.filter((v) => isHexColor(v))).toMatchInlineSnapshot(`[]`);
    });

    test('isHSB', () => {
      const valid = ['0,0,0', '50,50,50', '360,100,100'];
      const invalid = [
        0,
        {},
        null,
        undefined,
        [],
        () => true,
        '+',
        '#ffffff',
        '255,255,-1',
        '255,-1,255',
        '-1,255,255',
        '255,255,256',
        '255,256,255',
        '256,255,255',
        'ff,255,255',
        '0, 101, 101',
        '-1,100,100',
        '361,100,100',
      ];

      expect(valid.filter((v) => !isHSB(v))).toMatchInlineSnapshot(`[]`);
      expect(invalid.filter((v) => isHSB(v))).toMatchInlineSnapshot(`[]`);
    });
  });
});
