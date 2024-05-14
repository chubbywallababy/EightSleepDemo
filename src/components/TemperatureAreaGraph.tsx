import React from 'react';
import {
  SleepTemperatureLineGraphData,
  TimeseriesDataPoint,
} from '../utils/types';
import {LineChart} from 'react-native-gifted-charts';
import {View} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {DateSubtitle} from './common';
import {colors} from '../styles/colors';
import {PointerLabelComponent, graphStyles} from './PointerLabelComponent';
import {strings} from '../i18n';

dayjs.extend(utc);

interface HeartRateLineGraphProps {
  dataPoint: TimeseriesDataPoint<SleepTemperatureLineGraphData>;
}

/**
 * Wrapper around `react-native-gifted-charts` LineChart (as an area chart)
 * for temperature data (room and bed)
 * @param param0
 * @returns
 */
export const TemperatureAreaGraph = ({dataPoint}: HeartRateLineGraphProps) => {
  return (
    <View>
      <DateSubtitle ts={dataPoint.ts} />
      <View style={graphStyles.container}>
        <LineChart
          areaChart
          data={dataPoint.data.bedTempPoints}
          data2={dataPoint.data.roomTempPoints}
          yAxisOffset={dataPoint.data.yAxisOffset}
          spacing={250 / dataPoint.data.bedTempPoints.length}
          width={280}
          yAxisExtraHeight={20}
          noOfSections={dataPoint.data.yAxisLables.length - 1}
          thickness={2}
          color={colors.white}
          rulesColor="transparent"
          formatYLabel={l => l.split('.')[0]}
          yAxisColor={colors.white}
          xAxisColor={colors.white}
          yAxisTextStyle={graphStyles.textStyle}
          showStripOnFocus
          focusEnabled
          stripColor={colors.white}
          xAxisIndicesColor={colors.white}
          color1="#a56a1b"
          color2="#00949e"
          startFillColor1="#a56a1b11"
          endFillColor1="#000"
          startFillColor2="#00949e11"
          endFillColor2="#000"
          pointerConfig={{
            pointerColor: 'transparent',
            activatePointersOnLongPress: true,
            autoAdjustPointerLabelPosition: false,
            showPointerStrip: true,
            pointerStripUptoDataPoint: false,
            pointerStripColor: 'lightgray',
            pointerStripWidth: 4,
            pointerLabelComponent: PointerLabelComponent(dataPoint, 'degrees', [
              strings.common.bed,
              strings.common.room,
            ]),
          }}
          curved
          isAnimated
        />
      </View>
    </View>
  );
};
