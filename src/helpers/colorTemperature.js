const colorMapper = {
  subZero: '#a1ffff', //ice blue
  cold: '#00CCFF', //blue
  comfortable: '#FFCC66', //yellow
  hot: '#FF9966', // red orange
};

const getColorTempGradient = (temperature) => {
  if (temperature < 0) {
    return colorMapper.subZero;
  } else if (temperature < 49) {
    return colorMapper.cold;
  } else if (temperature < 80) {
    return colorMapper.comfortable;
  }
  return colorMapper.hot;
};

module.exports = {
  getColorTempGradient,
};
