import Geolocation from '@react-native-community/geolocation';

const baseUrl = 'https://api.weather.gov/';

const getColorTempGradient = temperature => {
  var textColor = '';

  //cools
  if (temperature < 0) {
    textColor = '#00FFFF'; //ice blue
  } else if (temperature > 0 < 20) {
    textColor = '#00CCFF'; //less icy blue? 
  } else if (temperature > 21 < 32) {
    textColor = '#0099FF'; // blue??
  } else if (temperature > 33 < 55) {
    textColor = '#009999'; //teal
  }

  //warms
  else if (temperature > 56 < 75) {
    textColor = '#FFFF66'; //yellow
  } else if (temperature > 76 < 85) {
    textColor = '#FFCC66'; //orange
  } else if (temperature > 86 < 100) {
    textColor = '#FF9966'; // red orange?? 
  } else {
    textColor = '#FF6666'; // red
  }

  return textColor;
};

module.exports = {
  getColorTempGradient,
};
