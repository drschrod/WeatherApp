const formatHourlyTime = (currentHour, index = 0) => {
  const itemHour = (currentHour + index) % 12;
  // NOTE: Make this a configurable option
  // const timeStamp = `${itemHour || 12} ${
  //   currentHour + index >= 12 ? 'PM' : 'AM'
  // }`;
  // return timeStamp;
  return `${itemHour || 12}`;
};

module.exports = {
  formatHourlyTime,
};
