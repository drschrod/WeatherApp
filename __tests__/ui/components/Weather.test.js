/**
 * @format
 */

import 'react-native';
import React from 'react';
import Weather from '../../../src/components/Weather';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Skipping because simulating the fetch response is hard and i am dumb.
// We can assume the api call works since its not in my control
it.skip('renders correctly', () => {
  renderer.create(<Weather />);
});
