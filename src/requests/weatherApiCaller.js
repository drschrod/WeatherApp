import Geolocation from '@react-native-community/geolocation';

const baseUrl = 'https://api.weather.gov/';

const transformForecastData = (data) => ({
  updatedAt: data.updated,
  units: data.units,
  elevation: data.elevation,
  intervals: data.periods,
});

const getForecast = async (route) => {
  let response = await fetch(route);
  if (response.status !== 200) {
    throw Error(
      `Non 200 response received: ${response.status} for route: ${route}`,
    );
  }
  let data = await response.json();
  return data.properties.periods;
};

const asyncGetCurrentPosition = (options = {}) =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });

const getWeatherData = async ({ longitude, latitude }) => {
  const coordAccuracy = 4;
  const route = `${baseUrl}points/${latitude.toFixed(
    coordAccuracy,
  )},${longitude.toFixed(coordAccuracy)}`;
  try {
    const baseData = await fetch(route);
    if (baseData.status !== 200) {
      throw Error(
        `Non 200 response received: ${baseData.status} for route: ${route}`,
      );
    }
    const json = await baseData.json();
    const { city, state } = json.properties.relativeLocation.properties;
    // NOTE: There is an error with the api currently when it is refreshing the hourly data every hour on the hour.
    // Should attempt to cache the hourly and daily forecast and use as backup if the request fails.
    // Also need to better deterministically tell if the call failed or not even though it sent a 200
    const hourlyForecastRoute = json.properties.forecastHourly;
    const dailyForecastRoute = json.properties.forecast;
    const hourlyForecast = await getForecast(hourlyForecastRoute);
    const dailyForecast = await getForecast(dailyForecastRoute);
    return {
      location: {
        city,
        state,
        latitude,
        longitude,
      },
      forecast: {
        current: hourlyForecast[0],
        hourly: hourlyForecast,
        daily: dailyForecast,
      },
    };
  } catch (error) {
    console.error(error);
    throw Error('Weather Data was not loaded properly');
  }
};

module.exports = {
  asyncGetCurrentPosition,
  getWeatherData,
  transformForecastData,
};
