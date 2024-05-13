import React, {useRef, useEffect} from 'react';
import {Animated, StyleSheet} from 'react-native';

interface GlowingBorderProps {
  children: React.ReactNode;
  shadowColor: string;
  delay?: number;
  duration?: number;
  maxShadowOpacity?: number;
  maxShadowRadius?: number;
  shadowOffset?: {height: number; width: number};
  hideGlow?: boolean;
}

/**
 * Animation doesn't work on Android, but still provides the glowing UI
 */
export const GlowingBorder = ({
  children,
  shadowColor,
  delay = 0,
  duration = 2000,
  maxShadowOpacity = 1,
  maxShadowRadius = 10,
  shadowOffset = {height: 0, width: 0},
  hideGlow,
}: GlowingBorderProps) => {
  const glowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.timing(glowAnimation, {
        toValue: 1,
        duration,
        delay: delay,
        useNativeDriver: false,
      }).start();
    };
    startAnimation();
  }, [delay, duration, glowAnimation]);

  const glowStyle = {
    shadowColor,
    shadowOffset,
    shadowOpacity: glowAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, maxShadowOpacity],
    }),
    shadowRadius: glowAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, maxShadowRadius],
    }),
  };

  if (hideGlow) {
    return children;
  }

  return (
    <Animated.View style={[styles.container, glowStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    elevation: 50, // Make the blurred effect for android
    borderColor: 'transparent', // Set border color to transparent to avoid actual border showing
  },
});
