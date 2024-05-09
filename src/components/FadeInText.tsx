import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Animated, {FadeIn} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface FadeInTextProps {
  text: string;
}

export const FadeInText = ({text}: FadeInTextProps) => {
  return (
    <AnimatedText
      entering={FadeIn.delay(2000).duration(1000)}
      style={styles.text}>
      {text}
    </AnimatedText>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
});
