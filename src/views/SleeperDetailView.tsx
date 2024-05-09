import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {
  getHeartRates,
  getMovements,
  getRespirations,
  getSortedStages,
} from '../utils/SleepDataUtils';
import {SleepDataByStageChart} from '../components/SleepDataByStageChart';
import {getLineData} from '../components/utils/getLineData';
import {SleepStageSwitch} from '../components/SleepStageSwitch';
import {Stage} from '../types';
import {SleepDataByLineItem} from '../types/SleepDataByLineItem';
import {SleepStagesPieGraph} from '../components/SleepStagesPieGraph';
import {Background} from '../components/common';

type SleepDataDetailViewProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

export const SleeperDetailView = ({
  route,
  navigation,
}: SleepDataDetailViewProps) => {
  const [selectedStage, setSelectedStage] = useState<Stage>(Stage.Deep);

  useEffect(() => {
    navigation?.setOptions({title: route.params.data.name});
  }, [navigation, route.params.data.name]);

  return (
    <Background>
      <View style={styles.switchContainer}>
        <SleepStageSwitch stage={selectedStage} setStage={setSelectedStage} />
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  textField: {
    padding: 20,
  },
  switchContainer: {
    paddingTop: 10,
  },
});
