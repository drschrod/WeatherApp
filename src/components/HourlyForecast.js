import React, {Component} from 'react';
import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import Constants from 'expo-constants';
import Temperature from './Temperature';

const Item = ({data, index, currentHour}) => {
  const itemHour = (currentHour + index) % 12;
  const timeStamp = `${itemHour || 12} ${
    currentHour + index >= 12 ? 'PM' : 'AM'
  }`;
  if (index <= 12) {
    return (
      <View style={styles.item}>
        <Text>{timeStamp}</Text>
        <Temperature
          temperature={data.temperature}
          temperatureUnit={data.temperatureUnit}
        />
      </View>
    );
  }
  return null;
};

export default class HourlyForecast extends Component {
  constructor(props) {
    super(props);
    this.state = {currentHour: new Date().getHours().toLocaleString()};
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({
        currentHour: new Date().getHours(),
      });
    }, 10000);
  }

  render() {
    const {forecast} = this.props;
    return (
      <View>
        <FlatList
          data={forecast}
          renderItem={({item, index}) => (
            <Item
              data={item}
              index={index}
              currentHour={this.state.currentHour}
            />
          )}
          keyExtractor={item => item.id}
          horizontal={true}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});
