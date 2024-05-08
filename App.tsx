/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  PixelRatio,
  View,
  StyleSheet,
  ScrollView,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
import {CircularProgress} from './src/components/CircularProgress';
import {FadeInText} from './src/components/FadeInText';
import {useAppDispatch, useAppSelector} from './src/redux/hooks';
import {selectData, selectStatus, fetchAsync} from './src/redux/sleepSlice';
import {SleepDataCell} from './src/components/SleepDataCell';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SleepDataListView} from './src/views/SleepDataListView';
import {SleepDataDetailView} from './src/views/SleepDataDetailView';
import {SleepData} from './src/types';

export type RootStackParamList = {
  Home: undefined;
  Details: {data: SleepData}
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SleepDataListView} />
        <Stack.Screen name="Details" component={SleepDataDetailView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
