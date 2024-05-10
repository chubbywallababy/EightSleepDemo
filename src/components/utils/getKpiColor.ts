import {KpiStatus} from '../../utils/SleepDataUtils';

/**
 * Tracks which colors are for which status.
 *
 * Currently arbitrary values are returned.
 *
 * @param status
 * @returns
 */
export const getKpiColor = (status: KpiStatus): string | undefined => {
  if (status === KpiStatus.Great) {
    return 'teal';
  } else if (status === KpiStatus.Bad) {
    return 'orange';
  }
  return undefined;
};
