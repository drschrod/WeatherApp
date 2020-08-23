/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import { SafeAreaView, StatusBar } from 'react-native';

import { Weather } from './src/containers';
import { styles } from './src/asssets/styles';

const App: () => React$Node = () => {
  return (
    <>
      {/* <ImageBackground source={nightBkg} style={imageBackground}> */}
      <SafeAreaView style={styles.safeAreaView} />
      <StatusBar style={{ opacity: 1 }} barStyle='light-content' />
      <Weather />
      <SafeAreaView style={styles.safeAreaView} />
      {/* </ImageBackground> */}
    </>
  );
};

export default App;
