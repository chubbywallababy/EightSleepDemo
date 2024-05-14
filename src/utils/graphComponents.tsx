import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SleepText} from '../components/common';
import {colors} from '../styles/colors';
import {Timeseries} from '../types';
import {lineDataItem} from 'react-native-gifted-charts';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

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
  xAxisLabel: {width: 100, color: 'white', textAlign: 'left'},
});

/**
 * A utility function to get standardized graph data from a Timeseries object
 *
 * @param timeseries
 * @returns
 */
export const getPoints = (
  timeseries: Timeseries,
  includePoint: boolean,
): {
  points: lineDataItem[];
  maxPoint: number;
  minPoint: number;
  minIdx: number;
  maxIdx: number;
} => {
  let minPoint = Infinity;
  let minIdx = 0;
  let maxPoint = 0;
  let maxIdx = 0;
  const points: lineDataItem[] = timeseries.map(([ts, v], index) => {
    if (v > maxPoint) {
      maxPoint = v;
      maxIdx = index;
    }
    if (v < minPoint) {
      minPoint = v;
      minIdx = index;
    }
    return {
      value: Math.floor(v),
      customDataPoint: includePoint ? dPoint : () => null,
      label:
        index === 0 || index === timeseries.length - 1
          ? dayjs(ts).utc().format('h:mm a')
          : undefined,
      labelTextStyle: graphStyles.xAxisLabel,
      // This is meant to be rendered on the main graph but we use it for the label when the user touches the graph
      dataPointText: dayjs(ts).utc().format('h:mm a'),
      // This allows us to keep the labels undefined.
      // The first and last labels are populated below (after determining which points are the max/min)
      dataPointLabelComponent,
    };
  });

  return {
    points,
    maxPoint,
    minPoint,
    maxIdx,
    minIdx,
  };
};
