/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  PixelRatio,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {CircularProgress} from './src/components/CircularProgress';

const radius = PixelRatio.roundToNearestPixel(130);
const STROKE_WIDTH = 30;

const App = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.ringChartContainer}>
          <CircularProgress
            strokeWidth={STROKE_WIDTH}
            radius={radius}
            backgroundColor="#f93986"
            percentageComplete={85}
          />
        </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  ringChartContainer: {
    width: radius * 2,
    height: radius * 2,
  },
});

export default App;