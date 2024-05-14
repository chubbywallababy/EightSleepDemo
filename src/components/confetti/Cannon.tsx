/**
 * this component is the controlling component.
 * it creates a number of confettis provided through the count prop.
 * then it provides each confetti child with animations and color.
 *
 * if we will be exclusively on the mobile an not on web, useNativeDriver can be true.
 * while it does work on the web, we won't be including this on the web because of an error
 * associated with react-native-web conversion of Animated.View to AnimatedComponent.
 */
import React, {forwardRef, ReactNode, useImperativeHandle} from 'react';
import {Animated, Dimensions, Easing} from 'react-native';

import {Confetti, Interpolations} from './Confetti';
import {randomColor, randomValue} from './utils';
import {colors} from '../../styles/colors';

type ConfettiProps = {
  count: number;
  origin: {
    x: number;
    y: number;
  };
  explosionSpeed?: number;
  fallSpeed?: number;
  colors?: Array<string>;
  fadeOut?: boolean;
  testID?: string;
  children?: ReactNode;
};

type Item = {
  leftDelta: number;
  topDelta: number;
  swingDelta: number;
  speedDelta: {
    rotateX: number;
    rotateY: number;
    rotateZ: number;
  };
  color: string;
};

export type ConfettiCannonRef = {
  start: (onAfterStart?: () => void) => void;
  stop: () => void;
};

export const TOP_MIN = 0.7;
export const DEFAULT_EXPLOSION_SPEED = 550;
export const DEFAULT_FALL_SPEED = 3000;

export const ConfettiCannon = forwardRef<ConfettiCannonRef, ConfettiProps>(
  (
    {
      count,
      origin,
      explosionSpeed = DEFAULT_EXPLOSION_SPEED,
      fallSpeed = DEFAULT_FALL_SPEED,
      fadeOut,
    }: ConfettiProps,
    ref,
  ) => {
    const animation = new Animated.Value(0);

    const sequence = Animated.sequence([
      Animated.timing(animation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 1,
        duration: explosionSpeed,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 2,
        duration: fallSpeed,
        easing: Easing.quad,
        useNativeDriver: true,
      }),
    ]);

    useImperativeHandle(
      ref,
      () => ({
        start: (onAfterStart?: () => void) => {
          sequence &&
            sequence.start(({finished}) => {
              if (finished) {
                sequence.reset();
                onAfterStart && onAfterStart();
              }
            });
        },
        stop: () => sequence && sequence.stop(),
      }),
      [sequence],
    );

    const items = Array(count)
      .fill(0)
      .map(
        (): Item => ({
          leftDelta: randomValue(0, 1),
          topDelta: randomValue(TOP_MIN, 1),
          swingDelta: randomValue(0.2, 1),
          speedDelta: {
            rotateX: randomValue(0.3, 1),
            rotateY: randomValue(0.3, 1),
            rotateZ: randomValue(0.3, 1),
          },
          color: randomColor(colors.confettiColors),
        }),
      );

    const {height, width} = Dimensions.get('window');

    return (
      <React.Fragment>
        {items.map((item: Item, index: number) => {
          const {containerTransform, transform, opacity} =
            getConfettiTransformations(
              animation,
              item,
              width,
              height,
              origin,
              fadeOut,
            );
          return (
            <Confetti
              color={item.color}
              containerTransform={containerTransform}
              transform={transform}
              opacity={opacity}
              key={index}
            />
          );
        })}
      </React.Fragment>
    );
  },
);

const getConfettiTransformations = (
  animation: Animated.Value,
  item: Item,
  width: number,
  height: number,
  origin: {x: number; y: number},
  fadeOut?: boolean,
) => {
  const left = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [origin.x, item.leftDelta * width, item.leftDelta * width],
  });
  const top = animation.interpolate({
    inputRange: [0, 1, 1 + item.topDelta, 2],
    outputRange: [-origin.y + 30, -item.topDelta * height, 0, 30],
  });
  const rotateX = animation.interpolate({
    inputRange: [0, 2],
    outputRange: ['0deg', `${item.speedDelta.rotateX * 360 * 10}deg`],
  });
  const rotateY = animation.interpolate({
    inputRange: [0, 2],
    outputRange: ['0deg', `${item.speedDelta.rotateY * 360 * 5}deg`],
  });
  const rotateZ = animation.interpolate({
    inputRange: [0, 2],
    outputRange: ['0deg', `${item.speedDelta.rotateZ * 360 * 2}deg`],
  });
  const translateX = animation.interpolate({
    inputRange: [0, 0.4, 1.2, 2],
    outputRange: [0, -(item.swingDelta * 30), item.swingDelta * 30, 0],
  });
  const opacity = animation.interpolate({
    inputRange: [0, 1, 1.8, 2],
    outputRange: [1, 1, 1, fadeOut ? 0 : 1],
  });
  const containerTransform: Interpolations = [
    {translateX: left},
    {translateY: top},
  ];
  const transform: Interpolations = [
    {rotateX},
    {rotateY},
    {rotate: rotateZ},
    {translateX},
  ];
  return {containerTransform, transform, opacity};
};
