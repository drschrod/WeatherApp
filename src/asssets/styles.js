import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

/*
Colors for UI
https://coolors.co/1a936f-88d498-c6dabf-ffb385-495b7c
https://coolors.co/5aa9e6-7fc8f8-cc92c2-ffb385-495b7c
*/
const defaultTextStyles = {
  fontFamily: 'Avenir',
  fontSize: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white',
};

const defaultStyles = {
  safeAreaView: {
    opacity: 0,
  },
  view: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    flexDirection: 'row',
  },
  container: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  title: {
    ...defaultTextStyles,
    fontSize: 50,
    fontWeight: 'bold',
  },
  text: {
    ...defaultTextStyles,
  },
};

module.exports = {
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    overflow: 'hidden',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
  weatherStyles: StyleSheet.create({
    ...defaultStyles,
  }),
  dailyForecastStyles: StyleSheet.create({
    ...defaultStyles,
    row: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 5,
      width: Dimensions.get('window').width,
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: 'black',
      opacity: 0.5,
      marginVertical: 5,
    },
    subRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    subColumn: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  }),
  forecastStyles: StyleSheet.create({
    ...defaultStyles,
    item: {
      justifyContent: 'space-around',
      flexDirection: 'row',

      width: Dimensions.get('window').width,
    },
  }),
  currentForecastStyles: StyleSheet.create({
    ...defaultStyles,
    text: {
      ...defaultTextStyles,
      fontSize: 50,
    },
  }),
  styles: StyleSheet.create({
    ...defaultStyles,
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
