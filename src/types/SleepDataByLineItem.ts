import {lineDataItem} from 'react-native-gifted-charts';
import {Stage} from './SleepStage';

export type SleepDataByLineItem = {
  [key in Stage]: lineDataItem[];
};
