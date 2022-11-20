/**
 * 1 = red
 *
 * 2 = green
 *
 * 3 = blue
 *
 * 4 = orange
 *
 * 5 = light green
 *
 * 6 = light blue
 *
 * 7 = amber
 *
 * 8 = cyan
 *
 * 9 = purple
 *
 * 10 = yellow
 *
 * 11 = pink
 *
 * 12 = white (using RGB channels)
 *
 * \+ = next color
 *
 * \- = previous color
 */
export type ColorPreset = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | '+' | '-';

/**
 * RGB value (0..255) separated by comma
 */
export type RGB = `${number},${number},${number}`;

/**
 * `#CWWW` = set hex color value for CT lights
 *
 * `#RRGGBB` = set hex color value for RGB lights
 *
 * `#RRGGBBWW` = set hex color value for RGBW lights
 *
 * `#RRGGBBCWWW` = set hex color value for RGBCCT lights (5 PWM channels)
 *
 * Note: You can append an `=` instead of the remaining color codes, this way they wont get changed e.g. `#00ff=`.
 */
export type HexColor = `#${string}`;

/**
 * {@link ColorPreset} or {@link RGB} or {@link HexColor}
 */
export type ColorValue = ColorPreset | RGB | HexColor;
