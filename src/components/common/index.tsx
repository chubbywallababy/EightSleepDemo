import React from 'react';
import {Text, TextProps, View, ViewProps} from 'react-native';
import {commonStyles} from '../../styles/styles';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
/**
 * A wrapper around react-native Text to help styling
 *
 * @param props
 * @returns Text component
 */
export const SleepText = (props: TextProps) => {
  return <Text {...props} style={[commonStyles.text, props.style]} />;
};

/**
 * A component to display the card title
 *
 * @param props
 * @returns Text component
 */
export const CardTitle = (props: TextProps) => {
  return (
    <SleepText
      {...props}
      style={[commonStyles.text, commonStyles.cardTitle, props.style]}
    />
  );
};

/**
 * A component to display subtitles
 *
 * @param props
 * @returns Text component
 */
export const DateSubtitle = (props: TextProps & {ts: string}) => {
  return (
    <SleepText
      {...props}
      style={[commonStyles.text, commonStyles.subtitle, props.style]}>
      {dayjs(props.ts).utc().format('MMM DD')}
    </SleepText>
  );
};

/**
 * A wrapper around react-native View to help styling smaller views, like table cells or items in a scroll view
 *
 * @param props
 * @returns View component
 */
export const SleepView = (
  props: ViewProps & {setWidth?: (width: number) => void},
) => {
  const setWidth = props.setWidth;
  return (
    <View
      {...props}
      style={[commonStyles.view, props.style]}
      onLayout={
        setWidth
          ? e => {
              setWidth(e.nativeEvent.layout.width);
            }
          : undefined
      }
    />
  );
};

/**
 * A wrapper around react-native View to help styling larger main views
 *
 * @param props
 * @returns View component
 */
export const Background = (props: ViewProps) => {
  return <View {...props} style={[commonStyles.background, props.style]} />;
};

export const LabelText = (props: TextProps) => {
  return <Text {...props} style={[commonStyles.label, props.style]} />;
};
