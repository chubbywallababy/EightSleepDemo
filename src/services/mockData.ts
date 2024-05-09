import {SleepData, SleepCycle, SleepStage, Stage} from '../types/index';
import {getRandomNumberInRange} from './getRandomNumberInRange';
import uuid from 'react-native-uuid';
import dayjs from 'dayjs';

export const getMockSleepDataList = (): SleepData[] => {
  let currentDay = dayjs(); // Initialize currentDay with today's date

  return new Array(getRandomNumberInRange(800, 1200)).fill('').map(() => {
    const sleepData = getMockSleepData(
      getRandomNumberInRange(3, 8),
      currentDay.format("MMM D, 'YY"),
      currentDay.format('MMM D'),
    );
    currentDay = currentDay.add(1, 'day'); // Increment currentDay by 1 day
    return sleepData;
  });
};

export const getMockSleepData = (
  numSessions: number,
  date: string,
  shortDate: string,
): SleepData => {
  // Generate an array of sleep sessions
  const sessions = generateSleepSessions(numSessions);

  const id = uuid.v4();
  return {
    sessions,
    averageSleep: calculateAverageSleepDuration(sessions),
    id: typeof id === 'string' ? id : id.join(),
    date,
    shortDate,
  };
};

const generateSleepSessions = (numSessions: number): SleepCycle[] => {
  const sessions: SleepCycle[] = [];
  let previousEndTime: Date | undefined;

  for (let i = 0; i < numSessions; i++) {
    const session = getMockSleepSession(previousEndTime);
    sessions.push(session);
    previousEndTime = new Date(session.endTime);
  }

  return sessions;
};

const getMockSleepSession = (previousEndTime?: Date): SleepCycle => {
  const startTime = getRandomDate(previousEndTime);
  const endTime = getRandomDate(startTime);
  // represents the current sleep stage
  let s = 1;
  const stages: SleepStage[] = new Array(3).fill('').map(() => {
    return getMockSleepStage(s++ % 4);
  }); // Generate 1-3 stages

  return {
    startTime: startTime.toString(),
    endTime: endTime.toString(),
    stages,
    totalDuration: stages.reduce((p, c) => c.duration + p, 0),
  };
};

const getMockSleepStage = (stage: number): SleepStage => {
  // Delegate to function with stage generation logic
  return getRandomSleepStageData(getStage(stage));
};

const getRandomSleepStageData = (stage: Stage): SleepStage => {
  const baseHeartRate = 70;
  const heartRateRange = 15;
  const baseRespirationRate = 15;
  const respirationRateRange = 5;
  const movementRange = 100;

  return {
    stage,
    duration: getRandomNumberInRange(20, 90), // Adjust for sleep cycle stages
    heartRate: getRandomNumberInRange(
      baseHeartRate - heartRateRange,
      baseHeartRate + heartRateRange,
    ),
    respirationRate: getRandomNumberInRange(
      baseRespirationRate - respirationRateRange,
      baseRespirationRate + respirationRateRange,
    ),
    movement: getRandomNumberInRange(0, movementRange),
    temperature: getRandomNumberInRange(36, 38),
  };
};

const getStage = (stageNumber: number): Stage => {
  switch (stageNumber) {
    case 1:
      return Stage.Deep;
    case 2:
      return Stage.Light;
    case 3:
      return Stage.Rem;
    default:
      throw new Error(
        'Unexpected random number for sleep stage generation: ' + stageNumber,
      );
  }
};

const getRandomDate = (baseDate?: Date): Date => {
  const now = new Date();
  if (!baseDate) {
    now.setDate(now.getDate() - 1); // Simulate date in the past night
    now.setHours(Math.floor(Math.random() * 24));
    now.setMinutes(Math.random() * 60);
  } else {
    now.setTime(baseDate.getTime() + Math.random() * (60 * 60 * 1000)); // Random time within an hour
  }
  return now;
};

const calculateAverageSleepDuration = (sessions: SleepCycle[]): number => {
  const totalDuration = sessions.reduce(
    (acc, session) => acc + session.totalDuration,
    0,
  );
  return Math.floor(totalDuration / sessions.length);
};
