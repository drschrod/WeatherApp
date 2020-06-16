import Geolocation from '@react-native-community/geolocation';

const baseUrl = 'https://api.weather.gov/';

const getColorTempGradient = temp => {
  var textColor = '';

  //cools
  if (temp < 0) {
    textColor = '#00FFFF';
  } else if (temp > 0 < 20) {
    textColor = '#00CCFF';
  } else if (temp > 21 < 32) {
    textColor = '#0099FF';
  } else if (temp > 33 < 55) {
    textColor = '#009999';
  }

  //warms
  else if (temp > 56 < 75) {
    textColor = '#FFFF66';
  } else if (temp > 76 < 85) {
    textColor = '#FFCC66';
  } else if (temp > 86 < 100) {
    textColor = '#FF9966';
  } else {
    textColor = '#FF6666';
  }

  return textColor;
};

module.exports = {
  getColorTempGradient,
};
