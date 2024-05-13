import React from 'react';
import {View} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

// interface SleepDataByStageChartProps {
//   data: pieDataItem[];
//   title: string;
//   units: string;
//   yAxisOffset: number;
//   noOfSections: number;
//   spacing: number;
//   initialSpacing: number;
// }

/**
 *
 * @returns {
  data: lineData,
  title,
  yAxisOffset,
  noOfSections,
  spacing,
  initialSpacing,
}: SleepDataByStageChartProps
 */

export const SleepDataByStageChart = () => {
  // if (lineData.find(d => d === undefined)) {
  //   throw new Error(
  //     'Should not have undefined value: ' + JSON.stringify(lineData),
  //   );
  // }

  // return (
  //   <View style={styles.conatiner}>
  //     <Text style={styles.text}>{title}</Text>
  //     <View style={styles.chartContainer}>
  //       <LineChart
  //         data={lineData}
  //         yAxisOffset={yAxisOffset}
  //         spacing={spacing}
  //         noOfSections={noOfSections}
  //         initialSpacing={initialSpacing}
  //         isAnimated
  //         animateTogether
  //         thickness={3}
  //         color="#07BAD1"
  //         xAxisLength={200}
  //         animateOnDataChange
  //         animationDuration={1000}
  //         onDataChangeAnimationDuration={300}
  //         yAxisTextStyle={styles.yAxis}
  //         hideDataPoints
  //         startFillColor={'rgb(84,219,234)'}
  //         endFillColor={'rgb(84,219,234)'}
  //         startOpacity={0.4}
  //         endOpacity={0.1}
  //         backgroundColor="#414141"
  //         rulesColor="gray"
  //         rulesType="solid"
  //         yAxisColor="lightgray"
  //         xAxisColor="lightgray"
  //         showDataPointOnFocus
  //         showStripOnFocus
  //         focusEnabled
  //         showTextOnFocus
  //         dataPointsColor1="white"
  //         xAxisIndicesColor="white"
  //         curved
  //       />
  //     </View>
  //   </View>
  const pieData = [
    {value: 54, color: '#177AD5'},
    {value: 40, color: '#79D2DE'},
    {value: 20, color: '#ED6665'},
  ];

  return (
    <View>
      <PieChart
        data={pieData}
        showText
        textColor="black"
        radius={100}
        textSize={20}
        focusOnPress
        showValuesAsLabels
        showTextBackground
        textBackgroundRadius={26}
      />
    </View>
  );
};

// const styles = StyleSheet.create({
//   chartContainer: {
//     paddingVertical: 20,
//     backgroundColor: '#414141',
//   },
//   text: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginLeft: 10,
//   },
//   conatiner: {
//     marginVertical: 10,
//   },
//   yAxis: {color: 'lightgray'},
// });
