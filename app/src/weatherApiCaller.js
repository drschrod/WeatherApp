import Geolocation from '@react-native-community/geolocation';

const baseUrl = "https://api.weather.gov/"

const transformForecastData = data => ({
    updatedAt: data.updated,
    units: data.units,
    elevation: data.elevation,
    forecast: data.periods
});

const getForecast = async (route) => {
    let response = await fetch(route);
    let data = await response.json();
    return transformForecastData(data.properties);
}

const asyncGetCurrentPosition = (options={}) => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
});

const getWeatherData = async () => {
    console.log("LOLFSDJFSDFJSDKJFKDSFJSD")
    const { latitude, longitude } = (await asyncGetCurrentPosition()).coords;
    const coordAccuracy = 4;
    const route = `${baseUrl}points/${latitude.toFixed(coordAccuracy)},${longitude.toFixed(coordAccuracy)}`;
    try {
        const response = await fetch(route);
        const json = await response.json();
        const { city, state } = json.properties.relativeLocation.properties;
        const hourlyForecastRoute = json.properties.forecastHourly;
        const hourlyForecast = await getForecast(hourlyForecastRoute);

        const dailyForecastRoute = json.properties.forecast;
        const dailyForecast = await getForecast(dailyForecastRoute);

        return {
            city,
            state,
            forecast: {
                hourly: hourlyForecast,
                daily: dailyForecast
            }
        };
    } catch (error) {
        console.error(error);
    }
    return null;
}

module.exports = {
    getWeatherData
}