/**
 * This is an individual piece of confetti shot by the cannon.
 */
import React from 'react';
import {Animated, PerspectiveTransform, StyleSheet} from 'react-native';

import {randomValue} from './utils';

type AnimatedInterpolation = ReturnType<Animated.Value['interpolate']>;

export type Interpolations = (
  | PerspectiveTransform
  | {rotateX: string | AnimatedInterpolation}
  | {rotateY: string | AnimatedInterpolation}
  | {rotate: string | AnimatedInterpolation}
  | {translateX: number | AnimatedInterpolation}
  | {translateY: number | AnimatedInterpolation}
)[];

type ConfettiProps = {
  containerTransform: Interpolations;
  transform: Interpolations;
  color: string;
  opacity: AnimatedInterpolation;
};

export const Confetti = ({
  containerTransform,
  transform,
  opacity,
  color,
}: ConfettiProps) => {
  const width: number = randomValue(8, 16);
  const height: number = randomValue(6, 12);
  const isRounded: boolean = Math.round(randomValue(0, 1)) === 1;
  const containerStyle = {transform: containerTransform};
  const style = {width, height, backgroundColor: color, transform, opacity};

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.confetti, containerStyle]}>
      <Animated.View style={[isRounded && styles.rounded, style]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  confetti: {
    position: 'absolute',
    left: -20,
    bottom: -20,
  },
  rounded: {
    borderRadius: 100,
  },
});
