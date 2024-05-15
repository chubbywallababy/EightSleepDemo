import dayjs from 'dayjs';
import {SleepInterval} from '../types';
import {dPointLabel, getPoints} from './graphComponents';
import {LineGraphData} from './types';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * Get respiratory data from an interval for the purposes of a line graph
 *
 */
export const getRespiratoryDataFromInterval = (
  interval: SleepInterval,
): LineGraphData => {
  const maxTs =
    interval.timeseries.respiratoryRate[
      interval.timeseries.respiratoryRate.length - 1
    ][0];
  const minTs = interval.timeseries.respiratoryRate[0][0];

  const {points, minPoint, maxPoint, minIdx, maxIdx} = getPoints(
    interval.timeseries.respiratoryRate,
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
    xAxisLabels: [
      dayjs(minTs).utc().format('HH:MMa'),
      dayjs(maxTs).utc().format('HH:MMa'),
    ],
    yAxisLables: getLineGraphYAxisForRespRateInterval(minPoint, maxPoint).map(
      n => Math.floor(n).toString(),
    ),
    yAxisOffset: minPoint - 2,
    maxValue: maxPoint - 5,
  };
};

/**
 * Returns 6 numbers representing the heart rate
 * values for the Y axis on the sleep heart rate line graph
 *
 * @param min lowest resp. rate
 * @param max highest resp. rate
 */
const getLineGraphYAxisForRespRateInterval = (
  min: number,
  max: number,
): number[] => {
  if (min > max) {
    throw new Error(`'min' needs to be less than 'max': min=${min} max=${max}`);
  }

  return [min, min + (max - min) / 2, max];
};
