import React, {useCallback} from 'react';
import {ChevronLeft} from './images';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useNavigation} from '../views/hooks/useNavigation';

export const NavigationBack = (props: HeaderBackButtonProps) => {
    const navigation = useNavigation();

    const onPress = useCallback(() => {
        if (props.canGoBack) {
            navigation?.goBack()
        }
    }, [navigation, props.canGoBack]);

    return (
        <TouchableOpacity {...props} onPress={onPress}>
            <ChevronLeft style={styles.chevron} />
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    chevron: {
        height: 16,
        width: 9,
    },
});