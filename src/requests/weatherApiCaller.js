import Geolocation from '@react-native-community/geolocation';

const baseUrl = 'https://api.weather.gov/';

const transformForecastData = data => ({
  updatedAt: data.updated,
  units: data.units,
  elevation: data.elevation,
  forecast: data.periods,
});

const getForecast = async route => {
  let response = await fetch(route);
  let data = await response.json();
  return transformForecastData(data.properties);
};

const asyncGetCurrentPosition = (options = {}) =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
  });

const getWeatherData = async location => {
  const {longitude, latitude} = location.coords;
  const coordAccuracy = 4;
  const route = `${baseUrl}points/${latitude.toFixed(
    coordAccuracy,
  )},${longitude.toFixed(coordAccuracy)}`;
  try {
    const baseData = await fetch(route);
    const json = await baseData.json();
    const {city, state} = json.properties.relativeLocation.properties;

    const hourlyForecastRoute = json.properties.forecastHourly;
    const dailyForecastRoute = json.properties.forecast;
    const hourlyForecast = await getForecast(hourlyForecastRoute);

    return {
      location: {
        city,
        state,
        latitude,
        longitude,
      },
      forecast: {
        current: hourlyForecast.forecast[0],
        hourly: await getForecast(hourlyForecastRoute),
        daily: await getForecast(dailyForecastRoute),
      },
    };
  } catch (error) {
    console.error(error);
  }
  return null;
};

module.exports = {
  asyncGetCurrentPosition,
  getWeatherData,
};
