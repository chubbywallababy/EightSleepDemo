import React from 'react';
import {SleepData} from '../types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

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
          <Text style={styles.sleepCountText}>
            {data.sessions.length}
            <Text style={styles.sleepLabelText}> sleep cycles</Text>
          </Text>
          <Text style={styles.sleepLabelText}>{data.shortDate}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  sleepDataCell: {
    width: '100%',
    height: 70,
    backgroundColor: '#f2f2f2',
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
    color: '#333',
  },
  sleepLabelText: {
    fontSize: 14,
    color: '#888',
  },
});
