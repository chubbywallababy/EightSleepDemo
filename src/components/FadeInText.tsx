import React from "react";
import {Text} from 'react-native'
import Animated, {FadeIn} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(Text);

interface FadeInTextProps {
    text: string;
}

export const FadeInText = ({text}: FadeInTextProps) => {
    return (
        <AnimatedText
            entering={FadeIn.delay(2000).duration(1000)}
            style={{
                textAlign: "center",
                fontSize: 20,
            }}
        >
            {text}
        </AnimatedText>
    )
}

