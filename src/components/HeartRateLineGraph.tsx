import React from 'react';
import {LineGraphData, TimeseriesDataPoint} from '../utils/types';
import {LineChart, lineDataItem} from 'react-native-gifted-charts';
import {StyleSheet, Text, View} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {strings} from '../i18n';
import {DateSubtitle} from './common';
import {colors} from '../styles/colors';

dayjs.extend(utc);

interface HeartRateLineGraphProps {
  dataPoint: TimeseriesDataPoint<LineGraphData>;
}

export const HeartRateLineGraph = ({dataPoint}: HeartRateLineGraphProps) => {
  return (
    <View>
      <DateSubtitle ts={dataPoint.ts} />
      <View style={styles.container}>
        <LineChart
          data={dataPoint.data.points}
          yAxisOffset={dataPoint.data.yAxisOffset}
          spacing={250 / dataPoint.data.points.length}
          width={280}
          yAxisExtraHeight={20}
          noOfSections={dataPoint.data.yAxisLables.length - 1}
          thickness={2}
          color={colors.white}
          rulesColor="transparent"
          formatYLabel={l => l.split('.')[0]}
          rulesType="solid"
          yAxisColor={colors.white}
          xAxisColor={colors.white}
          yAxisTextStyle={styles.textStyle}
          xAxisIndicesWidth={300}
          showStripOnFocus
          focusEnabled
          stripColor={colors.white}
          xAxisIndicesColor={colors.white}
          pointerConfig={{
            pointerColor: 'transparent',
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            showPointerStrip: true,
            pointerStripUptoDataPoint: false,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 4,
            pointerLabelComponent: pointerLabelComponent(dataPoint),
          }}
        />
      </View>
    </View>
  );
};

const pointerLabelComponent =
  (dataPoint: TimeseriesDataPoint<LineGraphData>) =>
  (items: lineDataItem[]) => {
    const item = items[0];
    return (
      <View style={styles.pointerContainer}>
        <Text style={styles.pointerText}>
          {strings.units.bpm((item?.value || 0) + dataPoint.data.yAxisOffset)}
        </Text>
        <Text style={styles.pointerText}>{item?.dataPointText || ''}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
  pointerText: {color: colors.text, fontWeight: 'bold'},
  pointerContainer: {
    width: 100,
    backgroundColor: '#282C3E',
    borderRadius: 8,
    justifyContent: 'center',
    padding: 16,
  },
  container: {paddingTop: 20},
  textStyle: {color: colors.text},
});
