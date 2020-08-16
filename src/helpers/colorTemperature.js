// Reference: https://css-tricks.com/converting-color-spaces-in-javascript/
const HSLToHex = ({ hue, saturation, luminance, alpha }) => {
  saturation /= 100;
  luminance /= 100;

  let c = (1 - Math.abs(2 * luminance - 1)) * saturation,
    x = c * (1 - Math.abs(((hue / 60) % 2) - 1)),
    m = luminance - c / 2,
    red = 0,
    green = 0,
    blue = 0,
    newAlpha = 0;

  if (hue >= 0 < 60) {
    red = c;
    green = x;
    blue = 0;
  } else if (hue >= 60 < 120) {
    red = x;
    green = c;
    blue = 0;
  } else if (hue >= 120 < 180) {
    red = 0;
    green = c;
    blue = x;
  } else if (hue >= 180 < 240) {
    red = 0;
    green = x;
    blue = c;
  } else if (hue >= 240 < 300) {
    red = x;
    green = 0;
    blue = c;
  } else if (hue >= 300 < 360) {
    red = c;
    green = 0;
    blue = x;
  }
  // Having obtained RGB, convert channels to hex
  red = Math.round((red + m) * 255).toString(16);
  green = Math.round((green + m) * 255).toString(16);
  blue = Math.round((blue + m) * 255).toString(16);
  newAlpha = Math.round(alpha * 255).toString(16);

  // Prepend 0s, if necessary
  if (red.length === 1) {
    red = '0' + red;
  }
  if (green.length === 1) {
    green = '0' + green;
  }
  if (blue.length === 1) {
    blue = '0' + blue;
  }
  if (newAlpha.length === 1) {
    newAlpha = '0' + newAlpha;
  }

  return '#' + red + green + blue + newAlpha;
};

const HSLToRGB = ({ hue, saturation, luminance }) => {
  // Must be fractions of 1
  saturation /= 100;
  luminance /= 100;

  let c = (1 - Math.abs(2 * luminance - 1)) * saturation,
    x = c * (1 - Math.abs(((hue / 60) % 2) - 1)),
    m = luminance - c / 2,
    red = 0,
    green = 0,
    blue = 0;

  if (hue >= 0 && hue < 60) {
    red = c;
    green = x;
    blue = 0;
  } else if (hue >= 60 && hue < 120) {
    red = x;
    green = c;
    blue = 0;
  } else if (hue >= 120 && hue < 180) {
    red = 0;
    green = c;
    blue = x;
  } else if (hue >= 180 && hue < 240) {
    red = 0;
    green = x;
    blue = c;
  } else if (hue >= 240 && hue < 300) {
    red = x;
    green = 0;
    blue = c;
  } else if (hue >= 300 && hue < 360) {
    red = c;
    green = 0;
    blue = x;
  }
  red = Math.round((red + m) * 255);
  green = Math.round((green + m) * 255);
  blue = Math.round((blue + m) * 255);

  return `rgba(${red}, ${green}, ${blue}, 1)`;
};

const colorFromTemperature = (temperature) => {
  const hue = 200 + 160 * (temperature / 100);
  return HSLToHex({ hue, luminance: 56, saturation: 82, alpha: 0.6 });
};

const getColorGradientFromTemperature = ({
  dayTemp,
  nightTemp,
  temperature,
}) => {
  if (dayTemp && nightTemp) {
    return [colorFromTemperature(dayTemp), colorFromTemperature(nightTemp)];
  } else if (dayTemp || nightTemp) {
    return [
      colorFromTemperature(dayTemp || nightTemp),
      colorFromTemperature(dayTemp || nightTemp),
    ];
  } else if (temperature) {
    return [
      colorFromTemperature(temperature),
      colorFromTemperature(temperature),
    ];
  }
  return [colorFromTemperature(50), colorFromTemperature(50)];
};

module.exports = {
  getColorGradientFromTemperature,
};
