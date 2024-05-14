import {SleepInterval, SleepStageValue} from '../types';
import {getMostRecentInterval, hoursToSleepObject} from './general';
import {getHeartRateLineGraphDataFromInterval} from './getHeartRateLineGraphDataFromInterval';
import {getSleepKpiData} from './getSleepKpiData';
import {getTemperatureDataFromInterval} from './getTemperatureGraphDataFromInterval';
import {
  DataPoint,
  LineGraphData,
  SleepDetailData,
  SleepStageData,
  SleepStagePercentage,
  SleepTemperatureLineGraphData,
  TimeseriesDataPoint,
} from './types';

/**
 * Get the data shown on the details view.
 *
 * This will include all KPI data from `getSleepKpiData` and more.
 *
 * @param data
 * @returns
 */
export const getSleepDetailData = (
  data: SleepInterval[] | undefined,
): SleepDetailData | undefined => {
  const kpiData = getSleepKpiData(data);
  if (!data || !kpiData) {
    return undefined;
  }

  return {
    ...kpiData,
    timeSleptDataPoint: getTimeSleptDataPoint(data),
    timeToFallAsleepDataPoint: getTimeToFallAsleepDataPoint(data),
    tntData: getTntTimeseriesData(data),
    sleepHeartRateData: getSleepHeartRateData(data),
    sleepStageData: getSleepStageData(data),
    temperatureData: getTemperatureData(data),
    respiratoryData: getRespiratoryData(data),
  };
};

/**
 * Returns data in a clean format for the UI to display the time slept
 *
 * @param intervals
 * @returns
 */
const getTimeSleptDataPoint = (intervals: SleepInterval[]): DataPoint => {
  const totalDurations = intervals.map(i =>
    i.stages.reduce((prev, stage) => prev + stage.duration, 0),
  );
  const average =
    totalDurations.reduce((prev, total) => prev + total, 0) /
    60 /
    60 /
    totalDurations.length;
  const averageSleepObj = hoursToSleepObject(average);
  const mostRecentInterval = getMostRecentInterval(intervals);

  if (!mostRecentInterval) {
    // TODO - include logging details
    throw new Error('Failed to fetch interval');
  }

  // in hours
  const timeSleptHours =
    mostRecentInterval.stages.reduce(
      (prev, stage) => prev + stage.duration,
      0,
    ) /
    60 /
    60;

  /** Static markers can be replaced with a util function that determines the start/end dynamically */
  const markers = [
    {value: 4, label: '4h'},
    {value: 5, label: '5h'},
    {value: 6, label: '6h'},
    {value: 7, label: '7h'},
    {value: 8, label: '8h'},
    {value: 9, label: '9h'},
    {value: 10, label: '10h'},
    {value: 11, label: '11h'},
  ];

  return {
    currentDataPoint: timeSleptHours,
    average: `${averageSleepObj.hours}h ${averageSleepObj.minutes}m`,
    // Arbitrary goal for demo purposes.
    // Ideally this would be returned by the BE
    // or at least have predetermined business logic.
    goal: {min: 7, max: 9},
    markers,
    lineRange: {min: markers[0].value, max: markers[markers.length - 1].value},
  };
};

/**
 * This function makes the assumption that the first
 * stage in an interval always represents the amount of time
 * it takes for someone to fall asleep.
 *
 * @param intervals
 * @returns
 */
const getTimeToFallAsleepDataPoint = (
  intervals: SleepInterval[],
): DataPoint => {
  const allFallAsleepStages = intervals.map(i => i.stages[0].duration);

  // in minutes
  const average = Math.floor(
    allFallAsleepStages.reduce((prev, curr) => prev + curr, 0) /
      allFallAsleepStages.length /
      60,
  );

  const mostRecentInterval = getMostRecentInterval(intervals);

  if (!mostRecentInterval) {
    // TODO - include logging details
    throw new Error('Failed to fetch interval');
  }

  const currentDataPoint = mostRecentInterval.stages[0].duration / 60;

  const markers = [
    {value: 0, label: 'In bed'},
    {value: 10, label: '+10m'},
    {value: 20, label: '+20m'},
    {value: 30, label: '+30m'},
    {value: 40, label: '+40m'},
  ];

  return {
    average: `${average}m`,
    currentDataPoint,
    // Arbitrary goal for demo purposes.
    // Ideally this would be returned by the BE
    // or at least have predetermined business logic.
    goal: {min: 0, max: 15},
    markers,
    lineRange: {min: markers[0].value, max: markers[markers.length - 1].value},
  };
};

const getSleepStageFromInterval = (interval: SleepInterval): SleepStageData => {
  const stageMap: {[key: string]: number} = {};
  const totalTimeAsleep = interval.stages.reduce((prev, stage) => {
    if (stageMap[stage.stage]) {
      stageMap[stage.stage] += stage.duration;
    } else {
      stageMap[stage.stage] = stage.duration;
    }
    return prev + stage.duration;
  }, 0);

  const percentages: SleepStagePercentage[] = [];

  for (const i in stageMap) {
    const timeInStage = stageMap[i];
    percentages.push({
      total: timeInStage,
      percentage: timeInStage / totalTimeAsleep,
      // Making this assumption based on the gist
      stage: i as SleepStageValue,
    });
  }

  return {
    totalTimeAsleep,
    percentages,
  };
};

/**
 * TODO - FINISH
 */
const getRespiratoryDataFromInterval = (
  interval: SleepInterval,
): LineGraphData => {
  return {
    points: [],
    yAxisLables: [],
    yAxisOffset: 0,
    xAxisLabels: [],
    maxValue: 100,
  };
};

const getTntTimeseriesData = (
  intervals: SleepInterval[],
): TimeseriesDataPoint<number>[] => {
  return intervals.map(i => ({
    ts: i.ts,
    data: i.timeseries.tnt.reduce((prev, tnt) => prev + tnt[1], 0),
  }));
};

const getSleepHeartRateData = (
  intervals: SleepInterval[],
): TimeseriesDataPoint<LineGraphData>[] => {
  return intervals.map(i => ({
    ts: i.ts,
    data: getHeartRateLineGraphDataFromInterval(i),
  }));
};

const getSleepStageData = (
  intervals: SleepInterval[],
): TimeseriesDataPoint<SleepStageData>[] =>
  intervals.map(i => ({
    ts: i.ts,
    data: getSleepStageFromInterval(i),
  }));

const getTemperatureData = (
  intervals: SleepInterval[],
): TimeseriesDataPoint<SleepTemperatureLineGraphData>[] =>
  intervals.map(i => ({
    ts: i.ts,
    data: getTemperatureDataFromInterval(i),
  }));

const getRespiratoryData = (
  intervals: SleepInterval[],
): TimeseriesDataPoint<LineGraphData>[] =>
  intervals.map(i => ({
    ts: i.ts,
    data: getRespiratoryDataFromInterval(i),
  }));
