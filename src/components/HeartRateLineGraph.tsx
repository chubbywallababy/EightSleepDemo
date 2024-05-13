import React from 'react';
import {LineGraphData, TimeseriesDataPoint} from '../utils/types';
import {LineChart, lineDataItem} from 'react-native-gifted-charts';
import {StyleSheet, Text, View} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {strings} from '../i18n';
import {DateSubtitle} from './common';

dayjs.extend(utc);

interface HeartRateLineGraphProps {
    dataPoint: TimeseriesDataPoint<LineGraphData>;
}

export const HeartRateLineGraph = ({
    dataPoint
}: HeartRateLineGraphProps) => {
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
                    thickness={3}
                    color="white"
                    rulesColor="transparent"
                    formatYLabel={(l) => l.split(".")[0]}
                    rulesType="solid"
                    yAxisColor="white"
                    xAxisColor="white"
                    yAxisTextStyle={{color: "white"}}
                    showStripOnFocus
                    focusEnabled
                    stripColor='white'
                    xAxisIndicesColor="white"
                    pointerConfig={{
                        pointerColor: 'transparent',
                        activatePointersOnLongPress: true,
                        autoAdjustPointerLabelPosition: false,
                        showPointerStrip: true,
                        pointerStripUptoDataPoint: false,
                        pointerStripColor: 'lightgray',
                        pointerStripWidth: 4,
                        pointerLabelComponent: (items: lineDataItem[]) => {
                            const item = items[0];
                            return (
                                <View style={styles.pionterContainer}>
                                    <Text style={styles.pointerText}>{strings.units.bpm(item.value + dataPoint.data.yAxisOffset)}</Text>
                                    <Text style={styles.pointerText}>{item.dataPointText}</Text>
                                </View>
                            );
                        },
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pointerText: {color: 'white', fontWeight: 'bold'},
    pionterContainer: {
        width: 100,
        backgroundColor: '#282C3E',
        borderRadius: 8,
        justifyContent: 'center',
        padding: 16,
    },
    container: {paddingTop: 20}
})