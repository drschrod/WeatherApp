import {StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

/*
Colors for UI
https://coolors.co/1a936f-88d498-c6dabf-ffb385-495b7c
https://coolors.co/5aa9e6-7fc8f8-cc92c2-ffb385-495b7c
*/

module.exports = {
  styles: StyleSheet.create({
    weather: {
      fontFamily: 'Avenir',
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black',
    },
    // hourlyForecast: {

    // },
    // dailyForecast: {

    // },
    view: {
      flex: 1,
    },
    baseText: {
      fontFamily: 'Avenir',
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
    safeAreaView: {
      flex: 1,
      backgroundColor: '#495B7C',
    },
    scrollView: {
      backgroundColor: 'black',
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  }),
};
