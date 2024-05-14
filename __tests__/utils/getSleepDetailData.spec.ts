import {SleepInterval} from '../../src/types';
import {getSleepDetailData} from '../../src/utils/getSleepDetailData';
import {SleepDetailData} from '../../src/utils/types';
import {user1Data} from '../__mocks__/users';

describe('getSleepDetailData', () => {
  it('should return undefined when input data is undefined', () => {
    const data: SleepInterval[] | undefined = undefined;
    const result: SleepDetailData | undefined = getSleepDetailData(data);
    expect(result).toBeUndefined();
  });

  it('should return correct KPI detail data for valid input', async () => {
    const result: SleepDetailData | undefined = getSleepDetailData(
      user1Data.intervals,
    );

    if (!result) {
      throw new Error('Result should be defined');
    }

    expect(result).toBeDefined();
    expect(result.averageScore).toEqual(50);
    expect(result.hasBadScore).toEqual(true);
    expect(result.tntData).toHaveLength(3);
    expect(result.sleepHeartRateData.length).toEqual(3);
    expect(result.averageDeepSleepDurationStr).toEqual('1h 2m');
    expect(result.timeSleptDataPoint.average).toEqual('6h 21m');
  });
});
