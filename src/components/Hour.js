import React from 'react';

import { Text, View } from 'react-native';

import PropTypes from 'prop-types';

import { styles } from '../asssets/styles';
import { getHourAndAmOrPm } from '../helpers/time';
function Hour({ currentHour, fontSize, index = 0 }) {
  const { hour, amOrPm } = getHourAndAmOrPm(currentHour, index);
  return (
    <View style={{ ...styles.row, justifyContent: 'space-around' }}>
      <Text style={{ ...styles.text, fontSize }}>{hour}</Text>
      <Text style={{ ...styles.text, fontSize: fontSize / 2 }}>{amOrPm}</Text>
    </View>
  );
}

export default Hour;

Hour.propTypes = {
  currentHour: PropTypes.number.isRequired,
  fontSize: PropTypes.number.isRequired,
  index: PropTypes.number,
};
