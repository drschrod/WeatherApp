import Geolocation from '@react-native-community/geolocation';

const baseUrl = 'https://api.weather.gov/';

const colorMapper = {
  subZero: '#00FFFF', //ice blue
  freezing: '#00CCFF', //blue
  chilly: '#009999', //teal
  comfortable: '#FFFF66', //yellow
  warm: '#FFCC66', //orange
  hot: '#FF9966', // red orange
  holyShitItsHot: '#FF6666', // red
};

const getColorTempGradient = temperature => {
  if (temperature < 0) {
    return colorMapper.subZero;
  } else if (temperature < 32) {
    return colorMapper.freezing;
  } else if (temperature < 55) {
    return colorMapper.chilly;
  } else if (temperature < 75) {
    return colorMapper.comfortable;
  } else if (temperature < 85) {
    return colorMapper.warm;
  } else if (temperature < 100) {
    return colorMapper.hot;
  } else {
    return colorMapper.holyShitItsHot;
  }
};

module.exports = {
  getColorTempGradient,
};
