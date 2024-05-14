import React from 'react';
import {lineDataItem} from 'react-native-gifted-charts';
import {LineGraphBase, TimeseriesDataPoint} from '../utils/types';
import {StyleSheet, Text, View} from 'react-native';
import {strings} from '../i18n';
import {colors} from '../styles/colors';

/**
 * Allows the user to see extra data when they touch on the graph
 *
 * @param dataPoint
 * @returns
 */
export const PointerLabelComponent =
    (dataPoint: TimeseriesDataPoint<LineGraphBase>, type: 'degrees' | 'bpm', prefixes?: string[]) =>
        (items: lineDataItem[]) => {
            const item = items[0];
            const item2 = items[1];

            let topLabel = '';
            let midLabel = undefined;

            if (type === 'degrees') {
                topLabel = strings.units.celcius((item?.value || 0) + dataPoint.data.yAxisOffset)
            } else if (type === 'bpm') {
                topLabel = strings.units.bpm((item?.value || 0) + dataPoint.data.yAxisOffset)
            }

            if (type === 'degrees' && item2) {
                midLabel = strings.units.celcius((item2?.value || 0) + dataPoint.data.yAxisOffset)
            }

            return (
                <View style={graphStyles.pointerContainer}>
                    <Text style={graphStyles.pointerText}>
                        {(prefixes && prefixes[0] ? `${prefixes[0]} ` : '') + topLabel}
                    </Text>
                    {midLabel ? <Text style={graphStyles.pointerText}>
                        {(prefixes && prefixes[1] ? `${prefixes[1]} ` : '') + midLabel}
                    </Text> : null}
                    <Text style={graphStyles.pointerText}>{item?.dataPointText || ''}</Text>
                </View>
            );
        };

export const graphStyles = StyleSheet.create({
    pointerText: {color: colors.text, fontWeight: 'bold'},
    pointerContainer: {
        width: 120,
        backgroundColor: '#282C3E',
        borderRadius: 8,
        justifyContent: 'center',
        padding: 16,
    },
    container: {paddingTop: 20},
    textStyle: {color: colors.text},
});
