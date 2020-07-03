/**
 * @format
 */

import 'react-native';
import {
  asyncGetCurrentPosition,
  transformForecastData,
} from '../../../src/requests/weatherApiCaller';

import { hourly, daily } from './weatherApiTestData';

test('asyncGetCurrentPosition', async () => {
  const location = await asyncGetCurrentPosition();
  expect(location).toMatchObject({
    coords: {
      latitude: 51.1,
      longitude: 45.3,
    },
  });
});

describe('transformForecastData', () => {
  test('hourly', () => {
    const data = transformForecastData(hourly.properties);
    expect(data).toMatchObject({
      updatedAt: hourly.properties.updated,
      units: hourly.properties.units,
      elevation: hourly.properties.elevation,
      forecast: hourly.properties.periods,
    });
  });
  test('daily', () => {
    const data = transformForecastData(daily.properties);
    expect(data).toMatchObject({
      updatedAt: daily.properties.updated,
      units: daily.properties.units,
      elevation: daily.properties.elevation,
      forecast: daily.properties.periods,
    });
  });
});
