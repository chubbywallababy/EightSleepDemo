/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SleepDataListView} from './src/views/SleepDataListView';
import {SleepDataDetailView} from './src/views/SleepDataDetailView';
import {SleepData} from './src/types';
import {StatusBar} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Details: {data: SleepData};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer theme={DarkTheme}>
      <StatusBar
        backgroundColor="#61dafb"
        barStyle='light-content'
      />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={SleepDataListView} />
        <Stack.Screen name="Details" component={SleepDataDetailView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
