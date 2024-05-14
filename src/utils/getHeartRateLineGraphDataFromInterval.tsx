import React from 'react';
import {lineDataItem} from 'react-native-gifted-charts';
import {SleepInterval} from '../types';
import {LineGraphData} from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {StyleSheet, View} from 'react-native';
import {colors} from '../styles/colors';
import {SleepText} from '../components/common';

dayjs.extend(utc);

/**
 * Get the heart rate data for a given interval in a format that a line graph can digest
 * 
 * @param interval 
 * @returns LineGraphData
 */
export const getHeartRateLineGraphDataFromInterval = (
  interval: SleepInterval,
): LineGraphData => {
  const maxTs =
    interval.timeseries.heartRate[interval.timeseries.heartRate.length - 1][0];
  const minTs = interval.timeseries.heartRate[0][0];

  let minPoint = Infinity;
  let minIdx = 0;
  let maxPoint = 0;
  let maxIdx = 0;

  const points: lineDataItem[] = interval.timeseries.heartRate.map(
    ([ts, v], index) => {
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
        customDataPoint: dPoint,
        label:
          index === 0 || index === interval.timeseries.heartRate.length - 1
            ? /** TODO - Fix. Adding a space in place of styling. Should address with proper styling after finishing tasks */
            ' ' + dayjs(ts).utc().format('h:mm a')
            : undefined,
        labelTextStyle: styles.xAxisLabel,
        // This is meant to be rendered on the main graph but we use it for the label when the user touches the graph
        dataPointText: dayjs(ts).utc().format('h:mm a'),
        // This allows us to keep the labels undefined for all expect the first and last
        dataPointLabelComponent,
      };
    },
  );

  points[minIdx].dataPointLabelComponent = () =>
    dPointLabel(Math.floor(minPoint), false);
  points[minIdx].hideDataPoint = false;
  points[maxIdx].dataPointLabelComponent = () =>
    dPointLabel(Math.floor(maxPoint), true);
  points[maxIdx].hideDataPoint = false;

  return {
    points,
    xAxisLabels: [dayjs(minTs).format('HH:MMa'), dayjs(maxTs).format('HH:MMa')],
    yAxisLables: getLineGraphYAxisForHeartRateInterval(minPoint, maxPoint).map(
      n => Math.floor(n).toString(),
    ),
    yAxisOffset: minPoint - 8,
    maxValue: minPoint,
  };
};

/** This allows us to keep the labels undefined for all expect the first and last */
export const dataPointLabelComponent = () => null;

/**
 * Returns 6 numbers representing the heart rate
 * values for the Y axis on the sleep heart rate line graph
 *
 * @param min lowest heart rate
 * @param max highest heart rate
 * @returns 6 numbers in an array
 */
const getLineGraphYAxisForHeartRateInterval = (
  min: number,
  max: number,
): [number, number, number, number, number, number] => {
  if (min > max) {
    throw new Error(`'min' needs to be less than 'max': min=${min} max=${max}`);
  }

  const top = max + 5;
  const bottom = min - 15;

  const diff = top - bottom;
  const interval = diff / 4;

  return [
    bottom,
    bottom + interval,
    bottom + interval * 2,
    bottom + interval * 3,
    bottom + interval * 4,
    top,
  ];
};

export const dPoint = () => {
  return <View style={styles.point} />;
};

export const dPointLabel = (value: number, isHigh: boolean) => {
  return (
    <SleepText
      style={[isHigh ? styles.labelHigh : styles.labelLow, styles.label]}>
      {value}
    </SleepText>
  );
};

const POINT_SIZE = 7;

const styles = StyleSheet.create({
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
