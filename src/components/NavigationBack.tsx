import React, {useCallback} from 'react';
import {ChevronLeft} from './images';
import {TouchableOpacity} from 'react-native';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useNavigation} from '../views/hooks/useNavigation';

/**
 * Get a view with a custom back icon
 * 
 * @param props 
 * @returns A back button for nested views
 */
export const NavigationBack = (props: HeaderBackButtonProps) => {
    const navigation = useNavigation();

    const onPress = useCallback(() => {
        if (props.canGoBack) {
            navigation?.goBack()
        }
    }, [navigation, props.canGoBack]);

    return (
        <TouchableOpacity {...props} onPress={onPress}>
            <ChevronLeft />
        </TouchableOpacity>
    )
};