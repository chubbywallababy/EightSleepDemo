import {KpiStatus} from '../../utils/SleepDataUtils';

/**
 * Tracks which colors are for which status.
 *
 * Currently arbitrary values, but red/blue were not chosen because in the app they already
 * represent a temperature (hot/cold). Would clarify with product on this.
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
