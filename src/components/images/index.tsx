import React from 'react';
import {Image, ImageProps, StyleSheet} from 'react-native';

export const ChevronRight = (props: ImageProps) => {
  return <Image source={require('./Chevron.png')} {...props} />;
};

export const ChevronLeft = (props: ImageProps) => {
  return (
    <Image source={require('./Chevron.png')} {...props} style={[props.style, styles.chevronLeft]} />
  );
};

export const EightSleepLogo = (props: ImageProps) => {
  return <Image source={require('./EightSleepLogo.png')} {...props} />;
};

const styles = StyleSheet.create({
  chevronLeft: {
    transform: [{rotate: '-180deg'}],
  },
});