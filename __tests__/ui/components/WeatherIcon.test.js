/**
 * @format
 */

import { render, cleanup } from '@testing-library/react-native';

import 'react-native';

import React from 'react';

import { WeatherIcon } from '../../../src/components';

const ShortDayForecasts = {
  'Chance Showers And Thunderstorms': 'weather-lightning-rainy',
  'Partly Cloudy': 'weather-partly-cloudy',
  'Weathery Weather Defaults Icon': 'weather-sunny',
};

const ShortNightForecasts = {
  'Chance Showers And Thunderstorms': 'weather-lightning-rainy',
  'Partly Cloudy': 'weather-night-partly-cloudy',
  'Weathery Weather Defaults Icon': 'weather-night',
};

afterEach(cleanup);
describe('shortForecast Variations', () => {
  afterEach(cleanup);
  it.each(Object.keys(ShortDayForecasts))(
    'renders expected icon for "%s" for daytime',
    (shortForecast) => {
      const { getByTestId } = render(
        <WeatherIcon
          shortForecast={shortForecast}
          isDaytime={true}
          size={100}
        />,
      );
      getByTestId(ShortDayForecasts[shortForecast]);
      //   expect(getByTestId(ShortDayForecasts[shortForecast])).toBe(true);
    },
  );

  it.each(Object.keys(ShortNightForecasts))(
    'renders expected icon for "%s" for nighttime',
    (shortForecast) => {
      const { getByTestId } = render(
        <WeatherIcon
          shortForecast={shortForecast}
          isDaytime={false}
          size={100}
        />,
      );
      getByTestId(ShortNightForecasts[shortForecast]);
      //   expect(getByTestId(ShortNightForecasts[shortForecast])).toBe(true);
    },
  );
});
