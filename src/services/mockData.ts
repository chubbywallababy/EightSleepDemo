import {SleepData, SleepSession, SleepStage, Stage} from '../types/index';
import {getRandomNumberInRange} from './getRandomNumberInRange';

export const getMockSleepData = (): SleepData => {
  // Generate a random number of sleep sessions (3-7)
  const numSessions = Math.floor(Math.random() * 5) + 3;

  // Generate an array of sleep sessions
  const sessions = generateSleepSessions(numSessions);

  return {
    sessions,
    averageSleep: calculateAverageSleepDuration(sessions),
  };
};

const generateSleepSessions = (numSessions: number): SleepSession[] => {
  const sessions: SleepSession[] = [];
  let previousEndTime: Date | undefined;

  for (let i = 0; i < numSessions; i++) {
    const session = getMockSleepSession(previousEndTime);
    sessions.push(session);
    previousEndTime = session.endTime;
  }

  return sessions;
};

const getMockSleepSession = (previousEndTime?: Date): SleepSession => {
  const startTime = getRandomDate(previousEndTime);
  const endTime = getRandomDate(startTime);
  const stages: SleepStage[] = new Array(3).fill(getMockSleepStage()); // Generate 1-3 stages

  return {
    startTime,
    endTime,
    stages,
    totalDuration: stages.reduce((p, c) => c.duration + p, 0),
  };
};

const getMockSleepStage = (): SleepStage => {
  // Delegate to function with stage generation logic
  return getRandomSleepStageData(generateRandomStage());
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

const generateRandomStage = (): Stage => {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  switch (randomNumber) {
    case 1:
      return 'deep';
    case 2:
      return 'light';
    case 3:
      return 'rem';
    default:
      throw new Error('Unexpected random number for sleep stage generation.');
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

const calculateAverageSleepDuration = (sessions: SleepSession[]): number => {
  const totalDuration = sessions.reduce(
    (acc, session) => acc + session.totalDuration,
    0,
  );
  return Math.floor(totalDuration / sessions.length);
};
