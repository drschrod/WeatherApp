/**
 * @format
 */

import 'react-native';
import React from 'react';
import Temperature from '../../../src/components/Temperature';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Temperature />);
});
