import React from 'react';
import {SleepData} from '../types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {LabelText, SleepText} from './common';

export interface SleepDataCellProps {
  data: SleepData;
  onPress: () => void;
}

export class SleepDataCell extends React.PureComponent<SleepDataCellProps> {
  render() {
    const {onPress, data} = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.sleepDataCell}>
          <SleepText style={styles.sleepCountText}>
            {data.sessions.length}
            <LabelText> sleep cycles</LabelText>
          </SleepText>
          <LabelText>{data.shortDate}</LabelText>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  sleepDataCell: {
    width: '100%',
    height: 70,
    backgroundColor: '#151515',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  sleepCountText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});
