import React from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export const SleepLinearGradient = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <LinearGradient
      colors={['#2819FD', '#7E25A7']}
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
