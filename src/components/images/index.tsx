import React from 'react';
import {Image, ImageProps} from 'react-native';

export const Chevron = (props: ImageProps) => {
  return <Image source={require('./Chevron.png')} {...props} />;
};

export const EightSleepLogo = (props: ImageProps) => {
  return <Image source={require('./EightSleepLogo.png')} {...props} />;
};
