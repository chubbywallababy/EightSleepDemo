import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {View} from 'react-native';

interface DataPointProps {
  dataView: React.ReactNode;
  detailText: string;
  unit?: string;
}
/**
 * This view accepts short detail text (tested between 5 and 20 characters),
 * a unit, and a view to show data. It's meant to show an auxiliary data point.
 */
export const DataPoint = ({dataView, detailText, unit}: DataPointProps) => {
  return (
    <View>
      <Text style={styles.detailText}>
        {detailText}
        {unit ? <Text style={styles.unitText}>{` (${unit})`}</Text> : null}
      </Text>
      {dataView}
    </View>
  );
};

const styles = StyleSheet.create({
  detailText: {
    color: '#ADB3C5',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 12,
    paddingBottom: 5,
  },
  unitText: {
    textTransform: 'lowercase',
    fontSize: 11,
  },
});
