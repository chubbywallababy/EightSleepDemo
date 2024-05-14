import {lineDataItem} from 'react-native-gifted-charts';
import {SleepInterval, Timeseries} from '../types';
import {SleepTemperatureLineGraphData} from './types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import {dataPointLabelComponent, graphStyles} from './graphComponents';

dayjs.extend(utc);

export const getTemperatureDataFromInterval = (
    interval: SleepInterval,
): SleepTemperatureLineGraphData => {
    const maxTs =
        interval.timeseries.tempBedC[interval.timeseries.tempBedC.length - 1][0];
    const minTs = interval.timeseries.tempBedC[0][0];

    const {
        points: bedPoints,
        maxPoint: bedMax,
        minPoint: bedMin,
        // maxIdx: bedMaxIdx,
        // minIdx: bedMinIdx,
    } = getPoints(interval.timeseries.tempBedC);

    const {
        points: roomPoints,
        maxPoint: roomMax,
        minPoint: roomMin,
        // maxIdx: roomMaxIdx,
        // minIdx: roomMinIdx,
    } = getPoints(interval.timeseries.tempRoomC);

    const minPoint = roomMin < bedMin ? roomMax : bedMax;
    const maxPoint = roomMax > bedMax ? roomMax : bedMax;

    return {
        bedTempPoints: bedPoints,
        roomTempPoints: roomPoints,
        xAxisLabels: [dayjs(minTs).format('HH:MMa'), dayjs(maxTs).format('HH:MMa')],
        yAxisLables: getLineGraphYAxisForTempInterval(minPoint, maxPoint).map(
            n => Math.floor(n).toString(),
        ),
        yAxisOffset: minPoint - 5,
        maxValue: minPoint,
    };
};

const getPoints = (timeseries: Timeseries): {
    points: lineDataItem[];
    maxPoint: number;
    minPoint: number;
    minIdx: number;
    maxIdx: number;
} => {

    let minPoint = Infinity;
    let minIdx = 0;
    let maxPoint = 0;
    let maxIdx = 0;
    const points: lineDataItem[] = timeseries.map(
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
                customDataPoint: () => null,
                label:
                    index === 0 || index === timeseries.length - 1
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

    return {
        points,
        maxPoint,
        minPoint,
        maxIdx,
        minIdx,
    }
}


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
): [number, number, number, number] => {
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
        top,
    ];
};
