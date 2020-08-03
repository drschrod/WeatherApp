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
  ImageBackground,
} from 'react-native';
import nightBkg from './src/asssets/nightsky.jpg';

import { styles, imageBackground } from './src/asssets/styles';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Weather from './src/components/Weather';

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.safeAreaView}>
          <ImageBackground source={nightBkg} style={imageBackground}>
            <Weather />
          </ImageBackground>
        
      </SafeAreaView>
    </>
  );
};

export default App;
