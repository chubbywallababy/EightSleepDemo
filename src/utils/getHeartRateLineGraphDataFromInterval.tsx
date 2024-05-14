import {SleepInterval} from '../types';
import {LineGraphData} from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {dPointLabel, getPoints} from './graphComponents';

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

  const {points, minIdx, minPoint, maxIdx, maxPoint} = getPoints(
    interval.timeseries.heartRate,
    true,
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
    yAxisOffset: minPoint - 5,
    maxValue: maxPoint + 10,
  };
};

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
