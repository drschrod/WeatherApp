/**
 * @format
 */

import 'react-native';
import React from 'react';
import Weather from '../../../src/components/Weather';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<Weather />);
});
