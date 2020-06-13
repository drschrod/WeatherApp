/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {styles} from './src/asssets/styles';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Weather from './src/components/Weather';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaView}>
        <Weather style={styles.weather} />
      </SafeAreaView>
    </>
  );
};

export default App;
