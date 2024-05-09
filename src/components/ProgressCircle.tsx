import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import {Svg, Circle} from 'react-native-svg';

interface ProgressCircleProps {
  percentage: number;
}

export const ProgressCircle = ({percentage}: ProgressCircleProps) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeWidth = 10;

  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: percentage / 100,
      duration: 1000, // Adjust duration as needed
      useNativeDriver: true,
    }).start();
  }, [percentage, progress]);

  const strokeDasharray = circumference;
  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [strokeDasharray, 0],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sleep Fitness</Text>
      <View style={styles.circle}>
        <Svg width={radius * 2} height={radius * 2}>
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke="#50C7FF" // Match circle color to image
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={(strokeDashoffset as any)?.__getValue() || 0}
          />
          <Circle
            cx={radius}
            cy={radius}
            r={radius - strokeWidth / 2}
            fill="none"
            stroke="#fff" // White stroke
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        </Svg>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#50C7FF', // Set background to blue
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    color: '#fff', // Text color white
  },
  circle: {
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3, // Optional for some Android versions
  },
  percentage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    textAlign: 'center',
    fontSize: 20,
    color: '#fff', // Text color white
  },
});
