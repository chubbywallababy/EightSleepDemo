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
import {AnimatedNumber, numberStyles} from './AnimatedNumber';
import {DataPoint} from './DataPoint';
import {strings} from '../i18n';
import {GlowingBorder} from './GlowingBorder';
import {getKpiColor} from './utils/getKpiColor';
import {SleepLinearGradient} from './SleepLinearGradient';

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
          {kpiData?.hasBadScore ?
            <SleepLinearGradient>
              <View style={styles.badScoreContainer}>
                <SleepText style={styles.badScoreText}>{strings.sleeperList.cell.seeInsights}</SleepText>
              </View>
            </SleepLinearGradient> : null}
          <ChevronRight />
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
              <GlowingBorder
                shadowColor={getKpiColor(kpiData.deepSleepDurationStatus) || ""}
                hideGlow={getKpiColor(kpiData.deepSleepDurationStatus) === undefined}
              >
                <DataPoint
                  dataView={<SleepText style={numberStyles.text}>{kpiData.averageDeepSleepDurationStr}</SleepText>}
                  detailText={strings.sleeperList.cell.deepSleep}
                />
              </GlowingBorder>
              <GlowingBorder
                shadowColor={getKpiColor(kpiData.scoreStatus) || ""}
                hideGlow={getKpiColor(kpiData.scoreStatus) === undefined}
              >
                <DataPoint
                  dataView={<AnimatedNumber n={kpiData.averageScore} duration={500} />}
                  detailText={strings.sleeperList.cell.sleepScore}
                  unit={strings.units.percent}
                />
              </GlowingBorder>
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
    flex: 1,
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  bottomDataRow: {
    paddingHorizontal: 15
  },
  indicator: {
    width: "100%",
  },
  badScoreText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  badScoreContainer: {
    paddingVertical: 5,
    paddingHorizontal: 18,
  },
});
