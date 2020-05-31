/**
 * @format
 */

import 'react-native';
import React from 'react';
import {
  getWeatherData,
  asyncGetCurrentPosition,
} from '../../../src/requests/weatherApiCaller';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import fetchMock from 'jest-fetch-mock';
import {points, hourly, daily} from './weatherApiTestData';
beforeAll(() => {
  // if you have an existing `beforeEach` just add the following lines to it
  fetchMock.mockIf(/^https?:\/\/api.weather.gov.*$/, req => {
    if (req.url.endsWith('points/51.1,45.3')) {
      return {
        status: 200,
        body: JSON.stringify(points),
        headers: {
          'Content-Type': 'application/geo+json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    } else if (req.url.endsWith('/forecast')) {
      return {
        status: 200,
        body: JSON.stringify(daily),
        headers: {
          'Content-Type': 'application/geo+json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    } else if (req.url.endsWith('/')) {
      return {
        status: 200,
        body: JSON.stringify(hourly),
        headers: {
          'Content-Type': 'application/geo+json',
          'Access-Control-Allow-Origin': '*',
        },
      };
    } else {
      return {
        status: 404,
        body: 'Not Found',
      };
    }
  });
});

test('asyncGetCurrentPosition', async () => {
  const location = await asyncGetCurrentPosition();
  expect(location).toMatchObject({
    coords: {
      latitude: 51.1,
      longitude: 45.3,
    },
  });
});

test.skip('getWeatherData', async () => {
  const location = await asyncGetCurrentPosition();
  // const weatherData = await getWeatherData(location);
});
