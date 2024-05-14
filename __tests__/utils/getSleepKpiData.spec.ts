import {SleepInterval} from '../../src/types';
import {getSleepKpiData} from '../../src/utils/getSleepKpiData';
import {SleepKpiData} from '../../src/utils/types';
import {user1Data} from '../__mocks__/users';

describe('getSleepKpiData', () => {
  it('should return undefined when input data is undefined', () => {
    const data: SleepInterval[] | undefined = undefined;
    const result: SleepKpiData | undefined = getSleepKpiData(data);
    expect(result).toBeUndefined();
  });

  it('should return correct KPI data for valid input', async () => {
    const result: SleepKpiData | undefined = getSleepKpiData(
      user1Data.intervals,
    );

    if (!result) {
      throw new Error('Result should be defined');
    }

    expect(result).toBeDefined();
    expect(result).toEqual({
      averageDeepSleepDuration: 1.03,
      averageDeepSleepDurationStr: '1h 2m',
      deepSleepDurationStatus: 3,
      averageScore: 50,
      scoreStatus: 3,
      hasBadScore: true,
    });
  });
});
