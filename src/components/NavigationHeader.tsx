import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {View} from 'react-native';
import {EightSleepLogo} from './images';
import {StyleSheet} from 'react-native';

export const NavigationHeader = (props: NativeStackHeaderProps) => (
  <View {...props} style={styles.container}>
    <EightSleepLogo style={styles.logo} />
  </View>
);

const styles = StyleSheet.create({
  container: {backgroundColor: 'black', alignItems: 'center', paddingTop: 30},
  logo: {height: 33, width: 70},
});
