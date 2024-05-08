import {SleepDataByLineItem} from '../../types/SleepDataByLineItem';
import {Text, View} from 'react-native';
import {SleepStageKeys} from '../../types';
import {SortedSleepStages} from '../../types/SortedSleepStages';

export const getLineData = (data: SortedSleepStages, key: SleepStageKeys): SleepDataByLineItem => {

    if (key === "stage") {
        throw new Error("stage key is not allowed");
    }

    return {
        "deep": data.deep.map(d => ({value: d[key]})),
        "light": data.light.map(d => ({value: d[key]})),
        "rem": data.rem.map(d => ({value: d[key]})),
    }
}

const dPoint = () => {
    return (
        <View
            style={{
                width: 14,
                height: 14,
                backgroundColor: 'white',
                borderWidth: 3,
                borderRadius: 7,
                borderColor: 'white',
            }}
        />
    );
};

const lcomp = (text: string) => {
    return <Text>{text}</Text>
}

const latestData = [
    {
        value: 100,
        labelComponent: () => lcomp('22 Nov'),
        customDataPoint: dPoint,
    },
    {
        value: 120,
        hideDataPoint: true,
    },
    {
        value: 210,
        customDataPoint: dPoint,
    },
    {
        value: 250,
        hideDataPoint: true,
    },
    {
        value: 320,
        labelComponent: () => lcomp('24 Nov'),
        customDataPoint: dPoint,
    },
    {
        value: 310,
    },
    {
        value: 270,
        customDataPoint: dPoint,
    },
    {
        value: 240,
    },
    {
        value: 130,
        labelComponent: () => lcomp('26 Nov'),
        customDataPoint: dPoint,
    },
    {
        value: 120,
    },
    {
        value: 100,
        customDataPoint: dPoint,
    },
    {
        value: 210,
    },
    {
        value: 270,
        labelComponent: () => lcomp('28 Nov'),
        customDataPoint: dPoint,
    },
    {
        value: 240,
    },
    {
        value: 120,
    },
    {
        value: 100,
        customDataPoint: dPoint,
    },
    {
        value: 210,
        labelComponent: () => lcomp('28 Nov'),
        customDataPoint: dPoint,
    },
    {
        value: 20,
        hideDataPoint: true,
    },
    {
        value: 100,
        customDataPoint: dPoint,
    },
];