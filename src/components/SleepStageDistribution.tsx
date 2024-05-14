import React from 'react';
import {PieChart, pieDataItem} from 'react-native-gifted-charts';
import {
  SleepStageData,
  SleepStagePercentage,
  TimeseriesDataPoint,
} from '../utils/types';
import {hoursToSleepObject, round} from '../utils/general';
import {StyleSheet, View} from 'react-native';
import {graphStyles} from './PointerLabelComponent';
import {DateSubtitle, SleepText} from './common';
import {SleepStageValue} from '../types';
import {strings} from '../i18n';
import {colors} from '../styles/colors';

interface SleepStageDistributionProps {
  dataPoint: TimeseriesDataPoint<SleepStageData>;
}

/**
 * A component to show how long a user spent in each
 *
 * @param param0
 * @returns
 */
export const SleepStageDistribution = ({
  dataPoint,
}: SleepStageDistributionProps) => {
  return (
    <View>
      <DateSubtitle ts={dataPoint.ts} />
      <View style={[graphStyles.container, styles.content]}>
        <PieChart
          data={getPieDataItems(dataPoint.data)}
          textColor="black"
          radius={120}
          focusOnPress
          strokeWidth={1}
          strokeColor="#333"
          innerCircleBorderWidth={10}
          innerCircleBorderColor="#333"
          showGradient
          gradientCenterColor={'#AAAAAA'}
          sectionAutoFocus
        />
        <LegendComponent
          percentages={dataPoint.data.percentages}
          total={dataPoint.data.totalTimeAsleep}
        />
      </View>
    </View>
  );
};

const getPieDataItems = (data: SleepStageData): pieDataItem[] => {
  return data.percentages.map(v => ({
    value: round(v.percentage, 2),
    color: STAGE_COLOR_MAP[v.stage] || '',
  }));
};

const STAGE_COLOR_MAP: {[key in SleepStageValue]: string} = {
  awake: '#5796bcCC',
  out: '#FFA500AA',
  light: '#008200AA',
  deep: '#47047cAA',
};

interface LegendComponentProps {
  percentages: SleepStagePercentage[];
  // The total length the user spent in bed
  total: number;
}

const LegendComponent = ({percentages, total}: LegendComponentProps) => {
  const {hours, minutes} = hoursToSleepObject(total / 60 / 60);
  return (
    <View style={styles.rowContainer}>
      <SleepText style={styles.totalTimeAsleep}>
        {`${strings.details.totalTimeAsleep} `}
        {strings.units.getHoursAndMinutes(hours, minutes)}
      </SleepText>
      {percentages.map(p => (
        <PercentageItem data={p} />
      ))}
    </View>
  );
};

interface PercentageItemProps {
  data: SleepStagePercentage;
}

const PercentageItem = ({data}: PercentageItemProps) => {
  return (
    <View style={styles.percentage}>
      <View
        style={[styles.circle, {backgroundColor: STAGE_COLOR_MAP[data.stage]}]}
      />
      <SleepText>{data.stage}</SleepText>
      <SleepText>
        {strings.units.asPercent(round(data.percentage * 100, 2))}
      </SleepText>
    </View>
  );
};

const CIRCLE_SIZE = 20;

const styles = StyleSheet.create({
  content: {alignItems: 'center', gap: 5},
  rowContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 3,
  },
  percentage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    gap: 5,
    borderRadius: 13,
    width: '70%',
    marginHorizontal: 6,
  },
  circle: {
    height: CIRCLE_SIZE,
    width: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 1,
    borderColor: colors.background,
  },
  totalTimeAsleep: {
    fontSize: 18,
    paddingVertical: 5,
  },
});
