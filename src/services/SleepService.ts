import {getRandomNumberInRange} from './getRandomNumberInRange';
import {getMockSleepData} from './mockData';

export const SleepService = {
  getData: async () => {
    const sleepDataPromise = new Promise(resolve => {
      setTimeout(() => {
        resolve(getMockSleepData());
      }, getRandomNumberInRange(500, 2000));
    });
    return await sleepDataPromise;
  },
};
