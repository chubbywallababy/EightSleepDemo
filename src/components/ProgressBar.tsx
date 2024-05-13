import React, {useEffect, useMemo} from 'react';
import {Animated, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';

interface ProgressBarProps {
  toValue: number;
  /** Defaults to 0 */
  initialValue?: number;
  /** Defaults to 1000 */
  duration?: number;
  style?: ViewStyle;
}

/**
 * An animated progress bar
 */
export const ProgressBar = ({
  toValue,
  initialValue = 0,
  style,
}: ProgressBarProps) => {
  const progress = useMemo(
    () => new Animated.Value(initialValue),
    [initialValue],
  );

  const interpolateProgress = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  useEffect(() => {
    Animated.timing(progress, {
      toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [toValue, progress]);

  return (
    <View style={styles.container}>
      <DottedLine numDots={35} dir="horizontal" />
      <Animated.View
        style={[styles.overlay, style, {width: interpolateProgress}]}
      />
    </View>
  );
};

interface DottedLineProps {
  numDots: number;
  dotStyle?: ViewStyle;
  containerStyle?: StyleProp<ViewStyle>;
  dir: 'vertical' | 'horizontal';
}
export const DottedLine = ({
  numDots,
  dotStyle,
  containerStyle,
  dir,
}: DottedLineProps) => {
  return (
    <View
      style={[
        dir === 'horizontal' ? styles.dottedLineHoriz : styles.dottedLineVert,
        containerStyle,
      ]}>
      {/* Solution would still work for larger screens but might need adjusting */}
      {new Array(numDots).fill('').map((_, i) => (
        <View
          style={[
            dir === 'horizontal' ? styles.horizDot : styles.vertDot,
            dotStyle,
          ]}
          key={i}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 5,
    borderRadius: 2.5,
    alignContent: 'center',
  },
  dottedLineVert: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  dottedLineHoriz: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizDot: {
    width: 4,
    height: 2,
    backgroundColor: 'gray',
    borderRadius: 2.5,
  },
  vertDot: {
    width: 2,
    height: 2,
    backgroundColor: 'gray',
    borderRadius: 2.5,
  },
  overlay: {
    height: 5,
    borderRadius: 4,
    backgroundColor: 'white',
    // Bring it up over the dotted line
    bottom: 2,
  },
});
