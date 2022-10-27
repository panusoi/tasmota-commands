import { isPreset, isCustomPreset } from './preset';

describe('types/preset', () => {
  test('isPreset', () => {
    expect(
      isPreset({
        preset: 'lightbulb-on-off',
      }),
    ).toMatchInlineSnapshot(`true`);

    expect(isPreset({})).toMatchInlineSnapshot(`false`);
    expect(isPreset(null)).toMatchInlineSnapshot(`false`);
    expect(isPreset(undefined)).toMatchInlineSnapshot(`false`);
    expect(
      isPreset({
        preset: 'invalid',
      }),
    ).toMatchInlineSnapshot(`false`);
    expect(
      isPreset({
        preset: 'custom',
      }),
    ).toMatchInlineSnapshot(`false`);
  });

  test('isCustomPreset', () => {
    expect(
      isCustomPreset({
        preset: 'custom',
        type: 'lightbulb',
        customPresetCharacteristics: ['On'],
      }),
    ).toMatchInlineSnapshot(`true`);

    expect(isCustomPreset({})).toMatchInlineSnapshot(`false`);
    expect(isCustomPreset(null)).toMatchInlineSnapshot(`false`);
    expect(isCustomPreset(undefined)).toMatchInlineSnapshot(`false`);
    expect(
      isCustomPreset({
        preset: 'lightbulb-on-off',
        type: 'lightbulb',
        customPresetCharacteristics: ['On'],
      }),
    ).toMatchInlineSnapshot(`false`);
    expect(
      isCustomPreset({
        preset: 'custom',
        type: 'invalid',
        customPresetCharacteristics: ['On'],
      }),
    ).toMatchInlineSnapshot(`false`);
    expect(
      isCustomPreset({
        preset: 'custom',
        type: 'lightbulb',
        customPresetCharacteristics: ['invalid'],
      }),
    ).toMatchInlineSnapshot(`false`);
  });
});
