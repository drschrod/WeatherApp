import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";

export default class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { temperature, temperatureUnit } = this.props;
    // Todo: gradient function for the temperature
    const textColor = temperature >= 80 ? 'red' : 'blue';
    return (
      <Text style={styles.temperatureText}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {`${temperature}° ${temperatureUnit}`}
        </Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  temperatureText: {
    fontFamily: "Cochin",
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black"
  }
});