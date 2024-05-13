import {ScrollView, TouchableOpacity, View} from 'react-native';
import {SleepView} from './common';
import {useCallback, useRef, useState} from 'react';
import {StyleSheet} from 'react-native';
import {ChevronLeft, ChevronRight} from './images';

interface HorizontalScrollViewProps {
    children: JSX.Element[];
}

export const HorizontalScrollView = ({children}: HorizontalScrollViewProps) => {
    const [width, setWidth] = useState(0);
    const ref = useRef<ScrollView | null>(null);

    const [currentIdx, setCurrentIdx] = useState(0);

    /**
     * When the user pushes the button to go left
     */
    const onLeft = useCallback(() => {
        if (currentIdx === 0 || !ref.current) {
            return;
        }
        ref.current?.scrollTo({x: width * (currentIdx - 1), animated: true});
        setCurrentIdx(x => x - 1);
    }, [ref, width, currentIdx]);

    /**
     * When the user pushes the button to go right
     */
    const onRight = useCallback(() => {
        if (currentIdx === children.length - 1 || !ref.current) {
            return;
        }
        ref.current.scrollTo({x: width * (currentIdx + 1), animated: true});
        setCurrentIdx(x => x + 1);
    }, [ref, width, currentIdx, children]);

    return (
        <SleepView setWidth={setWidth}>
            <ScrollView
                horizontal
                pagingEnabled
                decelerationRate={0}
                snapToInterval={width}
                ref={ref}
                scrollEnabled={false}
            >
                {children.map((child, i) => (
                    <HorizontalScrollChildContainer key={i} width={width}>{child}</HorizontalScrollChildContainer>
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onLeft}>
                    <ChevronLeft />
                </TouchableOpacity>
                <TouchableOpacity onPress={onRight}>
                    <ChevronRight />
                </TouchableOpacity>
            </View>
        </SleepView>
    )
}

interface HorizontalScrollChildContainerProps {
    width: number;
    children: JSX.Element;
}
const HorizontalScrollChildContainer = ({children, width}: HorizontalScrollChildContainerProps) => {
    return (
        <View style={[styles.child, {width}]}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingBottom: 20,
        marginHorizontal: 30,
    },
    child: {
        alignItems: "center",
    }
});