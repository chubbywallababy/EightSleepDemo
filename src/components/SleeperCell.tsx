import React from 'react';
import {User} from '../types';
import {ActivityIndicator, StyleSheet, TouchableOpacity, View} from 'react-native';
import {LabelText, SleepText} from './common';
import {useAppSelector} from '../redux/hooks';
import {selectUsersKpis, selectUsersStatus} from '../redux/sleep/selectors';

export interface SleeperCellProps {
    data: User;
    onPress: () => void;
}

export const SleeperCell = ({data, onPress}: SleeperCellProps) => {
    const kpiData = useAppSelector(selectUsersKpis(data.id));
    const userStatus = useAppSelector(selectUsersStatus(data.id));

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.sleepDataCell}>
                <SleepText style={styles.sleepCountText}>
                    {data.name}
                </SleepText>
                {userStatus === "loading" ? <ActivityIndicator color="white" /> : null}
                {userStatus === "failed" ? <SleepText>Sorry, there has been an error, please report</SleepText> : null}
                {kpiData !== undefined ? <LabelText>{JSON.stringify(Object.values(kpiData))}</LabelText> : null}
            </View>
        </TouchableOpacity>
    );
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
