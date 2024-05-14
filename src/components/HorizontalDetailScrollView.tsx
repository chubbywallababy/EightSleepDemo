import React, {useCallback, useRef, useState} from 'react';
import {
  ScrollView,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {CardTitle, SleepView} from './common';
import {StyleSheet} from 'react-native';
import {ChevronLeft, ChevronRight} from './images';

interface HorizontalDetailScrollViewProps {
  title: string;
  children: JSX.Element[];
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

/**
 * Allow multiple children to be passed in, and only one child is shown at a time.
 * Children can be scrolled through using arrow buttons.
 *
 * Future improvement would be to allow swiping
 *
 * @param param0
 * @returns
 */
export const HorizontalDetailScrollView = ({
  children,
  title,
  style,
  contentContainerStyle,
}: HorizontalDetailScrollViewProps) => {
  const [width, setWidth] = useState(0);
  const ref = useRef<ScrollView | null>(null);

  const [currentIdx, setCurrentIdx] = useState(0);

  /**
   * When the user pushes the button to go left
   */
  const onLeft = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current?.scrollTo({x: width * (currentIdx - 1), animated: true});
    setCurrentIdx(x => x - 1);
  }, [ref, width, currentIdx]);

  /**
   * When the user pushes the button to go right
   */
  const onRight = useCallback(() => {
    if (!ref.current) {
      return;
    }
    ref.current.scrollTo({x: width * (currentIdx + 1), animated: true});
    setCurrentIdx(x => x + 1);
  }, [ref, width, currentIdx]);

  return (
    <SleepView setWidth={setWidth}>
      <View style={[styles.contentContainer, style]}>
        <CardTitle style={styles.title}>{title}</CardTitle>
        <ScrollView
          horizontal
          pagingEnabled
          decelerationRate={0}
          snapToInterval={width}
          ref={ref}
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}>
          {children.map((child, i) => (
            <HorizontalScrollChildContainer key={i} width={width}>
              {child}
            </HorizontalScrollChildContainer>
          ))}
        </ScrollView>
      </View>
      <View style={styles.buttonContainer}>
        {/* Keep empty views when disabled so styling is consistent */}
        {currentIdx === 0 ? (
          <View />
        ) : (
          <TouchableOpacity onPress={onLeft} style={styles.scrollButton}>
            <ChevronLeft />
          </TouchableOpacity>
        )}
        {currentIdx === children.length - 1 ? (
          <View />
        ) : (
          <TouchableOpacity onPress={onRight} style={styles.scrollButton}>
            <ChevronRight />
          </TouchableOpacity>
        )}
      </View>
    </SleepView>
  );
};

interface HorizontalScrollChildContainerProps {
  width: number;
  children: JSX.Element;
}
/**
 * A wrapper around children passed in to the horizontal scroll view to keep consistent styling
 *
 * @param param0
 * @returns
 */
const HorizontalScrollChildContainer = ({
  children,
  width,
}: HorizontalScrollChildContainerProps) => {
  return <View style={[styles.child, {width}]}>{children}</View>;
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 20,
    marginHorizontal: 25,
  },
  child: {
    padding: 10,
    alignItems: 'flex-start',
  },
  contentContainer: {
    padding: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  scrollButton: {
    // Makes it easier to press
    width: 30,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
  },
});
