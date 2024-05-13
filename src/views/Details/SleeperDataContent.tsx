import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {CircularProgress} from '../../components/CircularProgress';
import {SleepDetailData} from '../../utils/types';
import {getKpiColor} from '../../components/utils/getKpiColor';
import {strings} from '../../i18n';
import {SleeperActionCell} from '../../components/SleeperActionCell';
import {Thermometer} from '../../components/images';
import {SleepStatCard} from '../../components/SleepStatCard';
import {hoursToSleepObject} from '../../utils/SleepDataUtils';
import {HorizontalDetailScrollView} from '../../components/HorizontalDetailScrollView';
import {TossAndTurnCount} from '../../components/TossAndTurnCount';
import {HeartRateLineGraph} from '../../components/HeartRateLineGraph';

/**
 *
 * This view shows all the data relevant to a sleeper analysis
 *
 * It's the responsibility of the parent to make sure the redux data is defined before presenting.
 *
 * @param param0
 * @returns
 */
export const SleeperDataContent = ({data}: {data: SleepDetailData}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.hasBadScore ? (
        <SleeperActionCell
          icon={<Thermometer />}
          details={strings.details.action.detail}
          title={strings.details.action.title}
          onPress={() => {
            console.log('hello!');
          }}
        />
      ) : null}
      <CircularProgress
        strokeWidth={10}
        percentageComplete={data.averageScore}
        radius={180}
        backgroundColor={getKpiColor(data.deepSleepDurationStatus) || 'white'}
        unit={strings.units.percent}
        detailText={strings.details.sleepFitness}
      />
      <SleepStatCard
        title={strings.details.card.titles.timeSlept}
        subtitle={strings.common.mostRecent}
        data={strings.units.getHoursAndMinutes(
          hoursToSleepObject(data.timeSleptDataPoint.currentDataPoint).hours,
          hoursToSleepObject(data.timeSleptDataPoint.currentDataPoint).minutes,
        )}
        subtitle2={strings.common.average}
        data2={data.timeSleptDataPoint.average}
        labels={data.timeSleptDataPoint.markers.map(v => v.label)}
        lineRange={data.timeSleptDataPoint.lineRange}
        goalRange={data.timeSleptDataPoint.goal}
        statValue={data.timeSleptDataPoint.currentDataPoint}
      />
      <SleepStatCard
        title={strings.details.card.titles.timeToFallAsleep}
        subtitle={strings.common.mostRecent}
        data={strings.units.getMinutes(
          data.timeToFallAsleepDataPoint.currentDataPoint,
        )}
        subtitle2={strings.common.average}
        data2={data.timeToFallAsleepDataPoint.average}
        labels={data.timeToFallAsleepDataPoint.markers.map(v => v.label)}
        lineRange={data.timeToFallAsleepDataPoint.lineRange}
        goalRange={data.timeToFallAsleepDataPoint.goal}
        statValue={data.timeToFallAsleepDataPoint.currentDataPoint}
      />
      <HorizontalDetailScrollView title={strings.details.card.titles.tossAndTurnCount}>
        {data.tntData.map((dataPoint) => <TossAndTurnCount dataPoint={dataPoint} key={dataPoint.ts} />)}
      </HorizontalDetailScrollView>
      <HorizontalDetailScrollView title={strings.details.card.titles.sleepHeartRate}>
        {data.sleepHeartRateData.map((dataPoint) => <HeartRateLineGraph key={dataPoint.ts} dataPoint={dataPoint} />)}
      </HorizontalDetailScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 10,
    gap: 20,
  },
  textField: {
    padding: 20,
  },
  textTest: {
    fontSize: 30
  }
});
