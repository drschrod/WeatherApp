/**
 * @format
 */

import 'react-native';
import {
  asyncGetCurrentPosition,
  transformForecastData,
} from '../../../src/requests/weatherApiCaller';

import {hourly, daily} from './weatherApiTestData';

test('asyncGetCurrentPosition', async () => {
  const location = await asyncGetCurrentPosition();
  expect(location).toMatchObject({
    coords: {
      latitude: 51.1,
      longitude: 45.3,
    },
  });
});

describe.skip('transformForecastData', () => {
  test('hourly', () => {
    const data = transformForecastData(hourly.properties);
    expect(data).toMatchObject({
      updatedAt: data.updated,
      units: data.units,
      elevation: data.elevation,
      forecast: data.periods,
    });
  });
  test('daily', () => {
    const data = transformForecastData(daily.properties);
    expect(data).toMatchObject({
      updatedAt: data.updated,
      units: data.units,
      elevation: data.elevation,
      forecast: data.periods,
    });
  });
});
