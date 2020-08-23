import React from 'react';

import { FlatList, Dimensions } from 'react-native';

import { styles } from '../asssets/styles';

import ForecastBlock from './ForecastBlock';
import Hour from './Hour';

function HourlyForecast({
  forecast,
  forecastRange,
  renderHorizontally,
  isDaytime,
  currentHour,
  screenHeight,
  screenWidth,
  header,
}) {
  const data = forecast.slice(0, forecastRange);
  data.reverse();
  // Idea: We can probably shove the current forecast into this list and set it as a fixed header
  return (
    <FlatList
      data={data}
      renderItem={({ item, index }) => (
        <ForecastBlock
          data={item}
          index={index}
          subText={
            <Hour
              currentHour={currentHour}
              index={item.number - 1}
              fontSize={50}
            />
          }
          isDaytime={isDaytime}
          screenHeight={screenHeight / 2}
          screenWidth={screenWidth}
          maxIndex={forecastRange - 1}
        />
      )}
      initialScrollIndex={forecastRange - 1}
      onScrollToIndexFailed={(e) => {
        console.error('HourlyForecast Flatlist: ', e);
      }}
      ListFooterComponent={header}
      style={styles.flatList}
      inverted={true}
      keyExtractor={(item) => `${item.number}`}
      horizontal={renderHorizontally}
      snapToInterval={Dimensions.get('window').width}
    />
  );
}

export default HourlyForecast;
