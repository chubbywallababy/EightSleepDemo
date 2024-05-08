import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';

interface AnimatedNumberProps {
    n: number;
    duration?: number;
}

export const AnimatedNumber = ({n, duration = 1000}: AnimatedNumberProps) => {
    const [count] = useState(new Animated.Value(0));
    const [currentValue, setCurrentValue] = useState(0);

    useEffect(() => {
        Animated.timing(count, {
            toValue: n,
            duration: duration,
            useNativeDriver: false, // Ensure native driver is off for Animated.timing
        }).start();
    }, [n, duration]);

    // Update currentValue whenever the animated value changes
    useEffect(() => {
        count.addListener(({value}) => setCurrentValue(Math.floor(value)));

        return () => {
            count.removeAllListeners();
        };
    }, [count]);

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.text, {
                opacity: count.interpolate({
                    inputRange: [0, n],
                    outputRange: [0, 1],
                })
            }]}>
                {currentValue}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
    },
});