import {SleepData} from '../types';
import {getRandomNumberInRange} from './getRandomNumberInRange';
import {getMockSleepDataList} from './mockData';

export const SleepService = {
  getData: async (): Promise<SleepData[]> => {
    const sleepDataPromise = new Promise<SleepData[]>(resolve => {
      setTimeout(() => {
        resolve(getMockSleepDataList());
      }, getRandomNumberInRange(500, 2000));
    });
    return sleepDataPromise;
  },
};
