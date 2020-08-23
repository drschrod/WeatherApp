const formatHourlyTime = (currentHour, index = 0) => {
  const itemHour = (currentHour + index) % 12;
  // NOTE: Make this a configurable option
  const timeStamp = `${itemHour || 12} ${
    currentHour + index >= 12 ? 'PM' : 'AM'
  }`;
  return timeStamp;
  // return `${itemHour || 12}`;
};

const getHourAndAmOrPm = (currentHour, index = 0) => {
  const hour = (currentHour + index) % 24;
  if (hour < 12 || hour === 24) {
    return {
      amOrPm: 'AM',
      hour: (currentHour + index) % 12 || 12,
    };
  }
  return {
    amOrPm: hour >= 12 ? 'PM' : 'AM',
    hour: hour % 12 || 12,
  };
};

module.exports = {
  formatHourlyTime,
  getHourAndAmOrPm,
};
