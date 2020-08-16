import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Temperature({
  temperature,
  temperatureUnit,
  color,
  fontSize,
}) {
  return (
    <Text style={{ ...styles.temperatureText, fontSize }}>
      {/* {`${temperature}° ${temperatureUnit}`} */}
      {`${temperature}°`}
    </Text>
  );
}

const styles = StyleSheet.create({
  temperatureText: {
    fontFamily: 'Avenir',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
});
