import React from 'react';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {SleepText} from './common';
import {StyleSheet, View} from 'react-native';

interface CircularProgressProps {
  strokeWidth: number;
  radius: number;
  backgroundColor: string;
  percentageComplete: number;
  unit?: string;
  detailText?: string;
}

/**
 * A wrapper around `react-native-circular-progress`.
 *
 * @param param0
 * @returns
 */
export const CircularProgress = ({
  radius,
  strokeWidth,
  backgroundColor,
  percentageComplete,
  unit,
  detailText,
}: CircularProgressProps) => {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={radius}
        width={strokeWidth}
        delay={200}
        lineCap="round"
        fill={percentageComplete}
        tintColor={backgroundColor}
        backgroundColor="#143F99"
        rotation={0}>
        {fill => (
          <SleepText style={styles.powerText}>
            <View style={styles.textViewContainer}>
              <View>
                <SleepText style={styles.boldText}>
                  {Math.floor(fill)}
                  {unit ? (
                    <SleepText style={styles.unitText}>{unit}</SleepText>
                  ) : null}
                </SleepText>
              </View>
              <View>
                {detailText ? (
                  <SleepText style={styles.detailText}>{detailText}</SleepText>
                ) : null}
              </View>
            </View>
          </SleepText>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

const styles = StyleSheet.create({
  textViewContainer: {
    flexDirection: 'column',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  powerText: {
    fontSize: 30,
    fontWeight: '300',
    marginLeft: 10,
  },
  boldText: {
    fontSize: 46,
    fontWeight: '700',
    textAlign: 'center',
  },
  unitText: {
    fontSize: 18,
  },
  detailText: {
    fontWeight: '700',
    fontSize: 16,
  },
});
