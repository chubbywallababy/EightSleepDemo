import React from 'react';
import {User} from '../types';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {SleepText} from './common';
import {useAppSelector} from '../redux/hooks';
import {selectUsersKpis, selectUsersStatus} from '../redux/sleep/selectors';
import {ChevronRight} from './images';
import {Platform} from 'react-native';
import {AnimatedNumber} from './AnimatedNumber';
import {DataPoint} from './DataPoint';

export interface SleeperCellProps {
  data: User;
  onPress: () => void;
}

export const SleeperCell = ({data, onPress}: SleeperCellProps) => {
  const kpiData = useAppSelector(selectUsersKpis(data.id));
  const userStatus = useAppSelector(selectUsersStatus(data.id));

  return (
    <TouchableOpacity onPress={onPress} style={styles.touchable}>
      <View style={styles.sleepDataCell}>
        <View style={styles.sleepDataRow}>
          <SleepText style={styles.titleText}>{data.name}</SleepText>
          <ChevronRight style={styles.chevron} />
        </View>
        <View style={[styles.sleepDataRow, styles.bottomDataRow]}>
          {userStatus === 'loading' ? (
            <ActivityIndicator color="white" style={styles.indicator} />
          ) : null}
          {userStatus === 'failed' ? (
            <SleepText>Sorry, there has been an error, please report</SleepText>
          ) : null}
          {kpiData !== undefined && userStatus === 'idle' ? (
            <>
              <DataPoint
                dataView={<AnimatedNumber n={kpiData.averageDeepSleepDuration} animateCount={false} duration={500} />}
                detailText='Deep sleep'
                unit='hrs'
              />
              <DataPoint
                dataView={<AnimatedNumber n={kpiData.averageScore} duration={500} />}
                detailText='Sleep score'
              />
            </>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    // Android (not iOS) cell reaches the horizontal edges of the screen
    marginHorizontal: Platform.OS === 'android' ? 10 : 0,
  },
  sleepDataCell: {
    width: '100%',
    height: 125,
    backgroundColor: '#202020',
    borderRadius: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  sleepDataRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chevron: {
    height: 16,
    width: 9,
  },
  bottomDataRow: {
    paddingHorizontal: 15
  },
  indicator: {
    width: "100%",
  }
});
