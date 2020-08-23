/**
 * @format
 */

import 'react-native';

import { getColorGradientFromTemperature } from '../../../src/helpers/colorTemperature';

const testTemperatures = Array(110 - 2 + 1)
  .fill()
  .map((_, idx) => 3 + idx);

describe('getColorGradientFromTemperature', () => {
  // getColorGradientFromTemperature
  test.each(testTemperatures)(
    'Generates color gradient for Hourly "%i" temperature in daytime',
    (temperature) => {
      const colorGradient = getColorGradientFromTemperature({
        temperature,
        isDaytime: true,
      });
      expect(colorGradient.length).toBe(2);
      expect(colorGradient[0]).toEqual(colorGradient[1]);
    },
  );

  test.each(testTemperatures)(
    'Generates color gradient for Hourly "%i" temperature in nighttime',
    (temperature) => {
      const colorGradient = getColorGradientFromTemperature({
        temperature,
        isDaytime: false,
      });
      expect(colorGradient.length).toBe(2);
      expect(colorGradient[0]).toEqual(colorGradient[1]);
    },
  );

  test.each(testTemperatures)(
    'Generates color gradient for Hourly "%i" temperature in daytime',
    (temperature) => {
      const colorGradient = getColorGradientFromTemperature({
        dayTemp: temperature,
        nightTemp: temperature / 2,
        isDaytime: true,
      });
      expect(colorGradient.length).toBe(2);
      expect(colorGradient[0]).not.toEqual(colorGradient[1]);
    },
  );

  test.each(testTemperatures)(
    'Generates color gradient for Hourly "%i" temperature in nighttime',
    (temperature) => {
      const colorGradient = getColorGradientFromTemperature({
        dayTemp: temperature,
        nightTemp: temperature / 2,
        isDaytime: false,
      });
      expect(colorGradient.length).toBe(2);
      expect(colorGradient[0]).not.toEqual(colorGradient[1]);
    },
  );
});
