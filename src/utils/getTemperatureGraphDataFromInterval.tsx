import {SleepInterval} from '../types';
import {SleepTemperatureLineGraphData} from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {getPoints} from './graphComponents';

dayjs.extend(utc);

export const getTemperatureDataFromInterval = (
  interval: SleepInterval,
): SleepTemperatureLineGraphData => {
  const maxTs =
    interval.timeseries.tempBedC[interval.timeseries.tempBedC.length - 1][0];
  const minTs = interval.timeseries.tempBedC[0][0];

  const {
    points: bedPoints,
    maxPoint: bedMax,
    minPoint: bedMin,
  } = getPoints(interval.timeseries.tempBedC, false);

  const {
    points: roomPoints,
    maxPoint: roomMax,
    minPoint: roomMin,
  } = getPoints(interval.timeseries.tempRoomC, false);

  const minPoint = roomMin < bedMin ? roomMax : bedMax;
  const maxPoint = roomMax > bedMax ? roomMax : bedMax;

  return {
    bedTempPoints: bedPoints,
    roomTempPoints: roomPoints,
    xAxisLabels: [dayjs(minTs).format('HH:MMa'), dayjs(maxTs).format('HH:MMa')],
    yAxisLables: getLineGraphYAxisForTempInterval(minPoint, maxPoint).map(n =>
      Math.floor(n).toString(),
    ),
    yAxisOffset: minPoint - 5,
    maxValue: minPoint,
  };
};

/**
 * Returns 6 numbers representing the temp
 * values for the Y axis on the temperature line graph
 *
 * @param min lowest heart rate
 * @param max highest heart rate
 * @returns 6 numbers in an array
 */
const getLineGraphYAxisForTempInterval = (
  min: number,
  max: number,
): [number, number, number, number] => {
  if (min > max) {
    throw new Error(`'min' needs to be less than 'max': min=${min} max=${max}`);
  }

  const top = max + 3;
  const bottom = min - 5;

  const diff = top - bottom;
  const interval = diff / 3;

  return [bottom, bottom + interval, bottom + interval * 2, top];
};
