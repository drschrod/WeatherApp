import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';

export default class Temperature extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {temperature, temperatureUnit, color, fontSize} = this.props;
    // Todo: gradient function for the temperature
    const textColor = {color: temperature >= 80 ? 'red' : 'blue'};
    return (
      <Text
        style={[
          styles.temperatureText,
          {color: color ? color : 'black', fontSize: fontSize ? fontSize : 50},
        ]}>
        <Text style={styles.titleText} onPress={this.onPressTitle}>
          {`${temperature}° ${temperatureUnit}`}
        </Text>
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  temperatureText: {
    fontFamily: 'Avenir',
    fontSize: 50,
    fontWeight: 'bold',
    color: 'black',
  },
});
