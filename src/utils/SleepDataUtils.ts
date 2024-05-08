import {SleepData, Stage} from '../types';
import {SleepDataPointByStage} from '../types/SleepDataPointByStage';
import {SortedSleepStages} from '../types/SortedSleepStages';

export const getSortedStages = (data: SleepData): SortedSleepStages => {
  const allStages = data.sessions.flatMap(s =>
    s.stages.map(st => ({...st, originalStartTime: s.startTime})),
  );
  return {
    deep: allStages.filter(s => s.stage === Stage.Deep),
    light: allStages.filter(s => s.stage === Stage.Light),
    rem: allStages.filter(s => s.stage === Stage.Rem),
  };
};

/**
 * Get the aggregated temperatures for a data set
 *
 * @param data
 * @returns
 */
export const getTemperatures = (data: SleepData): SleepDataPointByStage => {
  const allStages = data.sessions.flatMap(s => s.stages);
  return {
    deep: allStages.filter(s => s.stage === Stage.Deep).map(s => s.temperature),
    light: allStages
      .filter(s => s.stage === Stage.Light)
      .map(s => s.temperature),
    rem: allStages.filter(s => s.stage === Stage.Rem).map(s => s.temperature),
  };
};

/**
 * Get the aggregated heart rates for a data set
 *
 * @param data
 * @returns
 */
export const getHeartRates = (data: SleepData): SleepDataPointByStage => {
  const allStages = data.sessions.flatMap(s => s.stages);
  return {
    deep: allStages.filter(s => s.stage === Stage.Deep).map(s => s.heartRate),
    light: allStages.filter(s => s.stage === Stage.Light).map(s => s.heartRate),
    rem: allStages.filter(s => s.stage === Stage.Rem).map(s => s.heartRate),
  };
};

/**
 * Get the aggregated movement rating for a data set
 *
 * @param data
 * @returns
 */
export const getMovements = (data: SleepData): SleepDataPointByStage => {
  const allStages = data.sessions.flatMap(s => s.stages);
  return {
    deep: allStages.filter(s => s.stage === Stage.Deep).map(s => s.movement),
    light: allStages.filter(s => s.stage === Stage.Light).map(s => s.movement),
    rem: allStages.filter(s => s.stage === Stage.Rem).map(s => s.movement),
  };
};

/**
 * Get the aggregated respiration for a data set
 *
 * @param data
 * @returns
 */
export const getRespirations = (data: SleepData): SleepDataPointByStage => {
  const allStages = data.sessions.flatMap(s => s.stages);
  return {
    deep: allStages
      .filter(s => s.stage === Stage.Deep)
      .map(s => s.respirationRate),
    light: allStages
      .filter(s => s.stage === Stage.Light)
      .map(s => s.respirationRate),
    rem: allStages
      .filter(s => s.stage === Stage.Rem)
      .map(s => s.respirationRate),
  };
};
