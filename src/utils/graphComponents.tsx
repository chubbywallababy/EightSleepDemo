import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SleepText} from '../components/common';
import {colors} from '../styles/colors';

/** This allows us to keep the labels undefined for all expect the first and last */
export const dataPointLabelComponent = () => null;
export const dPoint = () => {
  return <View style={graphStyles.point} />;
};

export const dPointLabel = (value: number, isHigh: boolean) => {
  return (
    <SleepText
      style={[
        isHigh ? graphStyles.labelHigh : graphStyles.labelLow,
        graphStyles.label,
      ]}>
      {value}
    </SleepText>
  );
};

const POINT_SIZE = 7;

export const graphStyles = StyleSheet.create({
  point: {
    height: POINT_SIZE,
    width: POINT_SIZE,
    borderWidth: 2,
    borderRadius: POINT_SIZE / 2,
    borderColor: colors.white,
    backgroundColor: colors.secondary,
    // Adjusts so it's along the line
    bottom: 2,
    left: 1,
  },
  labelHigh: {
    bottom: 15,
  },
  labelLow: {
    top: 15,
  },
  label: {
    left: 10,
  },
  xAxisLabel: {width: 60, color: 'white'},
});
