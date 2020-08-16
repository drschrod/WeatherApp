import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { getHourAndAmOrPm } from '../helpers/time';
import { styles } from '../asssets/styles';

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
