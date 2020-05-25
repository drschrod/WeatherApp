import Geolocation from '@react-native-community/geolocation';

const baseUrl = "https://api.weather.gov/"

const routes = {
    rootWeatherData: "points/{lat},{lon}"
}

const asyncGetCurrentPosition = (options={}) => new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(resolve, reject, options);
});
const rootWeatherData = async () => {
    const { latitude, longitude } = (await asyncGetCurrentPosition()).coords;
    const coordAccuracy = 4;
    const route = `${baseUrl}points/${latitude.toFixed(coordAccuracy)},${longitude.toFixed(coordAccuracy)}`;
    console.log(route)
    try {
        let response = await fetch(route);
        let json = await response.json();
        console.log(json)
        return json;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    rootWeatherData
}