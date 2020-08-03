import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

export default class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { temperature, temperatureUnit, color, fontSize } = this.props;

    return (
      <Text style={styles.temperatureText}>
        {`${temperature}° ${temperatureUnit}`}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  temperatureText: {
    fontFamily: 'Avenir',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
  },
});
