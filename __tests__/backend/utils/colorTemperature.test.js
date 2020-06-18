/**
 * @format
 */

import 'react-native';
import {getColorTempGradient} from '../../../src/helpers/colorTemperature';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

const testTemperatures = [
  {testTemperature: -45, expectedHexColor: '#00FFFF'},
  {testTemperature: 12, expectedHexColor: '#00CCFF'},
  {testTemperature: 33, expectedHexColor: '#009999'},
  {testTemperature: 56, expectedHexColor: '#FFFF66'},
  {testTemperature: 78, expectedHexColor: '#FFCC66'},
  {testTemperature: 89, expectedHexColor: '#FF9966'},
  {testTemperature: 96, expectedHexColor: '#FF9966'},
  {testTemperature: 100, expectedHexColor: '#FF6666'},
  {testTemperature: 115, expectedHexColor: '#FF6666'},
];

describe.each(testTemperatures)(
  'getColorTempGradient',
  ({testTemperature, expectedHexColor}) => {
    describe('Positive cases', () => {
      it(`gets the expected hex color: "${expectedHexColor}" when temperature is: "${testTemperature}"`, () => {
        const result = getColorTempGradient(testTemperature);
        expect(result).toBe(expectedHexColor);
      });
    });

    describe('Negative cases', () => {
      it(`doesn't get the hex color: "#FFFFFF" when temperature is: "${testTemperature}"`, () => {
        const result = getColorTempGradient(testTemperature);
        expect(result).not.toBe('#FFFFFF');
      });
    });
  },
);
