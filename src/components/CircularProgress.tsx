import React, {useEffect} from "react";
import {StyleSheet, View, Button} from 'react-native'
import Svg, {Circle} from 'react-native-svg'
import Animated, {
    useAnimatedProps,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps {
    strokeWidth: number;
    radius: number;
    backgroundColor: string;
    percentageComplete: number;
}

export const CircularProgress = ({
    radius,
    strokeWidth,
    backgroundColor,
    percentageComplete,
}: CircularProgressProps) => {
    const innerRadius = radius - strokeWidth / 2;
    const circumfrence = 2 * Math.PI * innerRadius;
    const invertedCompletion = (100 - percentageComplete) / 100;

    const theta = useSharedValue(2 * Math.PI * 1.001);
    const animateTo = useDerivedValue(() => 2 * Math.PI * invertedCompletion);
    const textOpacity = useSharedValue(0);

    const FADE_DELAY = 1500;

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: withTiming(theta.value * innerRadius, {
                duration: FADE_DELAY,
            }),
        };
    });

    const powerTextStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(textOpacity.value, {
                duration: FADE_DELAY,
            }),
        };
    });

    const powerPercentTextStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(textOpacity.value, {
                duration: FADE_DELAY,
            }),
        };
    });

    useEffect(() => {
        if (!textOpacity.value) {
            theta.value = animateTo.value;
            textOpacity.value = 1;
        } else {
            theta.value = 2 * Math.PI * 1.001;
            textOpacity.value = 0;
        }
    }, [theta, animateTo, textOpacity]);

    return (
        <View style={styles.container}>
            <Svg style={StyleSheet.absoluteFill}>
                <AnimatedCircle
                    animatedProps={animatedProps}
                    cx={radius}
                    cy={radius}
                    fill={'transparent'}
                    r={innerRadius}
                    stroke={backgroundColor}
                    strokeDasharray={`${circumfrence} ${circumfrence}`}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                />
            </Svg>
            <Animated.Text style={[styles.powerText, powerTextStyle]}>
                Power %
            </Animated.Text>
            <Animated.Text style={[styles.powerPercentage, powerPercentTextStyle]}>
                {percentageComplete}
            </Animated.Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
    },
    powerText: {
        fontSize: 30,
        fontWeight: '300',
    },
    powerPercentage: {
        fontSize: 60,
        fontWeight: '200',
    },
});