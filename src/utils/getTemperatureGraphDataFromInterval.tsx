import React from 'react';
import {lineDataItem} from 'react-native-gifted-charts';
import {SleepInterval} from '../types';
import {LineGraphData, SleepTemperatureLineGraphData} from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {StyleSheet, View} from 'react-native';
import {colors} from '../styles/colors';
import {SleepText} from '../components/common';
import {dPointLabel, dPoint, dataPointLabelComponent, graphStyles} from './graphComponents';

dayjs.extend(utc);

export const getTemperatureDataFromInterval = (
    interval: SleepInterval,
): SleepTemperatureLineGraphData => {
    const maxTs =
        interval.timeseries.tempBedC[interval.timeseries.tempBedC.length - 1][0];
    const minTs = interval.timeseries.tempBedC[0][0];

    let minPoint = Infinity;
    let minIdx = 0;
    let maxPoint = 0;
    let maxIdx = 0;

    const points: lineDataItem[] = interval.timeseries.tempBedC.map(
        ([ts, v], index) => {
            if (v > maxPoint) {
                maxPoint = v;
                maxIdx = index;
            }
            if (v < minPoint) {
                minPoint = v;
                minIdx = index;
            }
            return {
                value: Math.floor(v),
                customDataPoint: dPoint,
                label:
                    index === 0 || index === interval.timeseries.tempBedC.length - 1
                        ? /** TODO - Fix. Adding a space in place of styling. Should address with proper styling after finishing tasks */
                        ' ' + dayjs(ts).utc().format('h:mm a')
                        : undefined,
                labelTextStyle: graphStyles.xAxisLabel,
                // This is meant to be rendered on the main graph but we use it for the label when the user touches the graph
                dataPointText: dayjs(ts).utc().format('h:mm a'),
                // This allows us to keep the labels undefined.
                // The first and last labels are populated below (after determining which points are the max/min)
                dataPointLabelComponent,
            };
        },
    );

    points[minIdx].dataPointLabelComponent = () =>
        dPointLabel(Math.floor(minPoint), false);
    points[minIdx].hideDataPoint = false;
    points[maxIdx].dataPointLabelComponent = () =>
        dPointLabel(Math.floor(maxPoint), true);
    points[maxIdx].hideDataPoint = false;

    return {
        bedTempPoints: points,
        roomTempPoints: [],
        xAxisLabels: [dayjs(minTs).format('HH:MMa'), dayjs(maxTs).format('HH:MMa')],
        yAxisLables: getLineGraphYAxisForTempInterval(minPoint, maxPoint).map(
            n => Math.floor(n).toString(),
        ),
        yAxisOffset: minPoint - 8,
        maxValue: minPoint,
    };
};


/**
 * Returns 6 numbers representing the temp
 * values for the Y axis on the temperature line graph
 *
 * @param min lowest heart rate
 * @param max highest heart rate
 * @returns 6 numbers in an array
 */
const getLineGraphYAxisForTempInterval = (
    min: number,
    max: number,
): [number, number, number, number, number, number] => {
    if (min > max) {
        throw new Error(`'min' needs to be less than 'max': min=${min} max=${max}`);
    }

    const top = max + 3;
    const bottom = min - 5;

    const diff = top - bottom;
    const interval = diff / 3;

    return [
        bottom,
        bottom + interval,
        bottom + interval * 2,
        bottom + interval * 3,
        bottom + interval * 4,
        top,
    ];
};
