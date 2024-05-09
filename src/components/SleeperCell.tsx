import React from 'react';
import {SleepData, User} from '../types';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {LabelText, SleepText} from './common';

export interface SleeperCellProps {
    data: User;
    onPress: () => void;
}

export class SleeperCell extends React.PureComponent<SleeperCellProps> {
    render() {
        const {onPress, data} = this.props;
        return (
            <TouchableOpacity onPress={onPress}>
                <View style={styles.sleepDataCell}>
                    <SleepText style={styles.sleepCountText}>
                        {data.name}
                    </SleepText>
                    <LabelText>data</LabelText>
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
