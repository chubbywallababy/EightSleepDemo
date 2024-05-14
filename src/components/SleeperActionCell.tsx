import React from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {SleepLinearGradient} from './SleepLinearGradient';
import {SleepText} from './common';
import {StyleSheet} from 'react-native';
import {ChevronRight} from './images';

interface SleeperActionCellProps {
  icon: React.ReactNode;
  style?: ViewStyle;
  title: string;
  details: string;
  onPress: () => void;
}

/**
 * Prompts the user to click on a cell to perform some action.
 *
 * The content is shown within a linear gradient.
 *
 * @param param0
 * @returns
 */
export const SleeperActionCell = ({
  icon,
  style,
  title,
  details,
  onPress,
}: SleeperActionCellProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <SleepLinearGradient style={{...styles.gradientContainer, ...style}}>
        <View style={styles.container}>
          <View style={styles.left}>
            {icon}
            <View>
              <SleepText style={styles.title}>{title}</SleepText>
              <SleepText style={styles.detail}>{details}</SleepText>
            </View>
          </View>
          <View style={styles.right}>
            <ChevronRight />
          </View>
        </View>
      </SleepLinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: '400',
  },
  detail: {
    fontWeight: '700',
    fontSize: 14,
  },
  gradientContainer: {
    paddingVertical: 8,
  },
  left: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 20,
  },
  right: {
    paddingRight: 10,
  },
});
