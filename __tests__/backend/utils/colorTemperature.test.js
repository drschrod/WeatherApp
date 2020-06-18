/**
 * @format
 */

import 'react-native';
import {getColorTempGradient} from '../../../src/helpers/colorTemperature';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

test('getColorTempGradient', () => {
  for (var i = -20; i < 121; i + 20) {
    var temp = getColorTempGradient(i);
  }
});
