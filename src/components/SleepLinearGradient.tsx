import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/**
 * A wrapper component to create linear gradients
 *
 * @param param0
 * @returns
 */
export const SleepLinearGradient = ({
  children,
  style,
  colors = ['#2819FD', '#7E25A7'],
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  colors?: string[];
}) => {
  return (
    <LinearGradient
      colors={colors}
      style={[styles.linearGradient, style]}
      angle={150}
      useAngle>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: 8,
    alignItems: 'center',
  },
});
