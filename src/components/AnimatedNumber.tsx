import React, {useState, useEffect} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {commonStyles} from '../styles/styles';

interface AnimatedNumberProps {
  n: number;
  duration?: number;
  /** Represents if the counting animation will occurr. Defaults to true */
  animateCount?: boolean;
}

/**
 * Does not currently work for numbers with decimals.
 *
 * @param param0
 * @returns
 */
export const AnimatedNumber = ({
  n,
  duration = 1000,
  animateCount = true,
}: AnimatedNumberProps) => {
  const [count] = useState(new Animated.Value(0));
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    Animated.timing(count, {
      toValue: n,
      duration: duration,
      useNativeDriver: false, // Ensure native driver is off for Animated.timing
    }).start();
  }, [n, duration, count, animateCount]);

  // Update currentValue whenever the animated value changes
  useEffect(() => {
    count.addListener(({value}) => setCurrentValue(Math.floor(value)));

    return () => {
      count.removeAllListeners();
    };
  }, [count]);

  return (
    <View style={numberStyles.container}>
      <Animated.Text
        style={[
          numberStyles.text,
          {
            opacity: count.interpolate({
              inputRange: [0, n],
              outputRange: [0, 1],
            }),
          },
        ]}>
        {animateCount ? currentValue : n}
      </Animated.Text>
    </View>
  );
};

export const numberStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    ...commonStyles.text,
    fontSize: 24,
    fontWeight: 'bold',
  },
});
