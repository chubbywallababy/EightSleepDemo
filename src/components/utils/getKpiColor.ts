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
    return '#0073DD';
  } else if (status === KpiStatus.Bad) {
    return 'orange';
  }
  return undefined;
};
