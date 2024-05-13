/**
 * For general util functions
 */

import {SleepInterval} from '../types';
import dayjs from 'dayjs';
import {SleepDurationObject} from './types';

/** Get the average for an array of numbers */
export const getAverage = (nums: number[]): number =>
  nums.reduce((a, b) => a + b, 0) / nums.length;
// Only meant to be used for a few decimal places, not tested completely
export const round = (n: number, places = 1) =>
  Math.round(n * 10 ** places) / 10 ** places;
/** Get the most recent sleep interval */
export const getMostRecentInterval = (intervals: SleepInterval[]) =>
  // copy the array in strict mode
  intervals
    .slice()
    .sort((a, b) => dayjs(b.ts).unix() - dayjs(a.ts).unix())
    .at(0);

/**
 * A utility function to get the hours and minutes for an object
 *
 * @param sleepHours
 * @returns {SleepDurationObject} SleepDurationObject
 */
export const hoursToSleepObject = (sleepHours: number): SleepDurationObject => {
  // Extract whole hours using Math.floor
  const hours = Math.floor(sleepHours);

  // Calculate remaining minutes using modulo operator (%)
  const minutes = Math.round((sleepHours - hours) * 60);

  return {hours, minutes};
};
