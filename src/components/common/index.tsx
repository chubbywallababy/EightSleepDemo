import React from 'react';
import {StyleSheet, Text, TextProps, View, ViewProps} from 'react-native';

/**
 * A wrapper around react-native Text to help styling
 *
 * @param props
 * @returns Text component
 */
export const SleepText = (props: TextProps) => {
  return <Text {...props} style={[commonStyles.text, props.style]} />;
};

/**
 * A wrapper around react-native View to help styling smaller views, like table cells or items in a scroll view
 *
 * @param props
 * @returns View component
 */
export const SleepView = (props: ViewProps) => {
  return <View {...props} style={[commonStyles.view, props.style]} />;
};

/**
 * A wrapper around react-native View to help styling larger main views
 *
 * @param props
 * @returns View component
 */
export const Background = (props: ViewProps) => {
  return <View {...props} style={[commonStyles.background, props.style]} />;
};

export const LabelText = (props: TextProps) => {
  return <Text {...props} style={[commonStyles.label, props.style]} />;
};

export const commonStyles = StyleSheet.create({
  background: {backgroundColor: '#000'},
  text: {color: 'white'},
  label: {color: '#888', fontSize: 14},
  view: {backgroundColor: '#202020'},
});
