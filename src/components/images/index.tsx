import React from 'react';
import {Image, ImageProps, StyleSheet} from 'react-native';

export const ChevronRight = (props: ImageProps) => {
  return <Image source={require('./Chevron.png')} {...props} style={[styles.chevron, props.style]} />;
};

export const ChevronLeft = (props: ImageProps) => {
  return (
    <Image source={require('./Chevron.png')} {...props} style={[styles.chevronLeft, styles.chevron, props.style]} />
  );
};

export const EightSleepLogo = (props: ImageProps) => {
  return <Image source={require('./EightSleepLogo.png')} {...props} />;
};

export const Thermometer = (props: ImageProps) => {
  return <Image source={require('./Thermometer.png')} {...props} style={[styles.thermometer, props.style]} />
}

export const Info = (props: ImageProps) => {
  return <Image source={require('./Info.png')} {...props} style={[styles.info, props.style]} />
}

const styles = StyleSheet.create({
  chevronLeft: {
    transform: [{rotate: '-180deg'}],
  },
  chevron: {
    height: 16,
    width: 9,
  },
  thermometer: {
    height: 24,
    width: 24,
  },
  info: {
    height: 21,
    width: 21,
  }
});