const formatHourlyTime = (currentHour, index = 0) => {
  const itemHour = (currentHour + index) % 12;
  const timeStamp = `${itemHour || 12} ${
    currentHour + index >= 12 ? 'PM' : 'AM'
  }`;
  return timeStamp;
};

module.exports = {
  formatHourlyTime,
};
