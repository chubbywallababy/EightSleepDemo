import React from 'react';
import {LineGraphData, TimeseriesDataPoint} from '../utils/types';
import {LineChart} from 'react-native-gifted-charts';
import {View} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {DateSubtitle} from './common';
import {colors} from '../styles/colors';
import {graphStyles, PointerLabelComponent} from './PointerLabelComponent';

dayjs.extend(utc);

interface HeartRateLineGraphProps {
  dataPoint: TimeseriesDataPoint<LineGraphData>;
}

/**
 * Wrapper around `react-native-gifted-charts` LineChart
 * for general data
 * @param param0
 * @returns
 */
export const SleepDataLineGraph = ({dataPoint}: HeartRateLineGraphProps) => {
  return (
    <View>
      <DateSubtitle ts={dataPoint.ts} />
      <View style={graphStyles.container}>
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
          yAxisTextStyle={graphStyles.textStyle}
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
            pointerLabelComponent: PointerLabelComponent(dataPoint, 'bpm'),
          }}
          isAnimated
        />
      </View>
    </View>
  );
};
