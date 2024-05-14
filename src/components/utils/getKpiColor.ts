import {colors} from '../../styles/colors';
import {KpiStatus} from '../../utils/types';

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
    return colors.great;
  } else if (status === KpiStatus.Bad) {
    return colors.bad;
  }
  return undefined;
};
