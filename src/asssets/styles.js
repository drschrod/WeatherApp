import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// TODO: Move this to Weather.js
const defaultBackgroundColor = () => {
  const hour = new Date().getHours();
  if (hour > 17 || hour < 7) {
    return '#252850';
  } else {
    return 'skyblue';
  }
};

const defaultTextStyles = {
  fontFamily: 'Avenir',
  fontSize: 25,
  fontWeight: 'bold',
  textAlign: 'center',
  color: 'white',
};

const boxShadowStyles = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 8,
  },
  shadowOpacity: 0.46,
  shadowRadius: 11.14,
};

const defaultStyles = {
  safeAreaView: {
    backgroundColor: defaultBackgroundColor(),
  },
  view: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: defaultBackgroundColor(),
    overflow: 'visible',
  },
  flatList: {
    backgroundColor: 'rgba(255, 255, 255, 0.0)',
  },
  container: {
    justifyContent: 'space-around',
    flexDirection: 'column',
    alignItems: 'center',
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
  pressable: {
    borderRadius: 8,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
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
    bottomNavBar: {
      ...defaultStyles.row,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    pressable: {
      ...defaultStyles.pressable,
      ...defaultStyles.text,
    },
    pressIn: {
      ...defaultStyles.text,
      color: 'black',
    },
  }),
  dailyForecastStyles: StyleSheet.create({
    ...defaultStyles,
    container: {
      ...defaultStyles.container,
      borderBottomStartRadius: 30,
      borderBottomEndRadius: 30,
      ...boxShadowStyles,
      marginTop: -35,
      // marginVertical: -10,
      paddingTop: 40,
      width: Dimensions.get('window').width,
    },
    row: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'flex-start',
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
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
  forecastBlock: StyleSheet.create({
    ...defaultStyles,
    item: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'stretch',
      marginTop: -30,
      paddingTop: 40,
      // paddingVertical: 30,
      width: Dimensions.get('window').width,
      borderBottomStartRadius: 40,
      borderBottomEndRadius: 40,
    },
    shadowBox: boxShadowStyles,
    text: {
      ...defaultStyles.text,
      textShadowColor: 'black',
      textShadowOffset: { width: 100, height: 100 },
      textShadowRadius: 5,
    },
  }),
  currentForecastStyles: StyleSheet.create({
    ...defaultStyles,
    text: {
      ...defaultTextStyles,
      fontSize: 50,
    },
    row: {
      justifyContent: 'space-around',
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 5,
      width: Dimensions.get('window').width,
    },
    block: {
      marginVertical: 5,
    },
    column: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    subRow: {
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    subColumn: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    container: {
      ...defaultStyles.container,
      backgroundColor: defaultBackgroundColor(),
      borderBottomStartRadius: 30,
      borderBottomEndRadius: 30,
      ...boxShadowStyles,
      shadowOffset: {
        width: 0,
        height: 20,
      },
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
