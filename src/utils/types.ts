/**
 * These are convenience types relevant to the UI.
 *
 * This data is represented in the JSON data at the S3 endpoints,
 * but not organized in S3 in a fashion that's optimal for the UI
 * to consume.
 */

import {lineDataItem} from 'react-native-gifted-charts';
import {SleepStageValue} from '../types';

/**
 * Numbered in case we want to sort
 */
export enum KpiStatus {
  Great = 0,
  Good = 1,
  OK = 2,
  Bad = 3,
}

export interface SleepDurationObject {
  hours: number;
  minutes: number;
}

export interface SleepKpiData {
  averageDeepSleepDuration: number;
  averageDeepSleepDurationStr: string;
  deepSleepDurationStatus: KpiStatus;
  averageScore: number;
  scoreStatus: KpiStatus;
  hasBadScore: boolean;
}

export interface SleepDetailData extends SleepKpiData {
  timeSleptDataPoint: DataPoint;
  timeToFallAsleepDataPoint: DataPoint;
  tntData: TimeseriesDataPoint<number>[];
  sleepHeartRateData: TimeseriesDataPoint<LineGraphData>[];
  sleepStageData: TimeseriesDataPoint<SleepStageData>[];
  temperatureData: TimeseriesDataPoint<SleepTemperatureLineGraphData>[];
  respiratoryData: TimeseriesDataPoint<LineGraphData>[];
}

export interface DataPoint {
  /** Can represent today or the most recent data point */
  currentDataPoint: number;
  /** The average for the user for a specific data point */
  average: string;
  goal: {min: number; max: number};
  /** The X axis representation */
  markers: {label: string; value: number}[];
  /** The largest and smalles possible values */
  lineRange: {min: number; max: number};
}

export interface LineGraphBase {
  xAxisLabels: string[];
  yAxisLables: string[];
  yAxisOffset: number;
  maxValue: number;
}

export interface LineGraphData extends LineGraphBase {
  /** Represents all of the graph points */
  points: lineDataItem[];
}

export interface TimeseriesDataPoint<T> {
  /** Date the data was gathered */
  ts: string;
  /** An array of data for the user to scroll through */
  data: T;
}

export interface SleepStageData {
  totalTimeAsleep: number;
  percentages: SleepStagePercentage[];
}

export interface SleepStagePercentage {
  stage: SleepStageValue;
  /** Represents as a percent compared to the total time asleep */
  percentage: number;
  /** The total time the user spent in this stage for a night */
  total: number;
}

export interface SleepTemperatureLineGraphData extends LineGraphBase {
  bedTempPoints: lineDataItem[];
  roomTempPoints: lineDataItem[];
}
