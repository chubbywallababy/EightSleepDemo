import React from 'react';
import {TimeseriesDataPoint} from '../utils/types';
import {StyleSheet, View} from 'react-native';
import {DateSubtitle, SleepText} from './common';

export interface TossAndTurnCountProps {
  dataPoint: TimeseriesDataPoint<number>;
}

/**
 * Show the number of times a sleeper has tossed/turned in a given night
 *
 * @param param0
 * @returns
 */
export const TossAndTurnCount = ({
  dataPoint,
}: TossAndTurnCountProps): JSX.Element => {
  const topCount = Math.floor(dataPoint.data / 2);
  const bottomCount =
    dataPoint.data % 2 === 0
      ? dataPoint.data / 2
      : Math.floor(dataPoint.data / 2) + 1;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DateSubtitle ts={dataPoint.ts} />
        <View style={styles.tntData}>
          <SleepText style={styles.data}>{dataPoint.data}</SleepText>
          <View style={styles.dots}>
            <View style={styles.row}>
              {new Array(topCount).fill('').map((_, i) => (
                <Circle key={i} />
              ))}
            </View>
            <View style={styles.row}>
              {new Array(bottomCount).fill('').map((_, i) => (
                <Circle key={i} />
              ))}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const CIRCLE_SIZE = 6;
const Circle = () => <View style={styles.circle} />;

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  content: {
    paddingRight: 20,
    gap: 20,
  },
  timestamp: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'white',
  },
  dots: {
    gap: 3,
  },
  row: {
    flexDirection: 'row',
    gap: 3,
  },
  tntData: {
    flexDirection: 'row',
    gap: 18,
    alignItems: 'center',
  },
  data: {
    fontSize: 48,
    fontWeight: '300',
  },
});
