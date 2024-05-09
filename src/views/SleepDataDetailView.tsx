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

type SleepDataDetailViewProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

export const SleepDataDetailView = ({
  route,
  navigation,
}: SleepDataDetailViewProps) => {
  const [selectedStage, setSelectedStage] = useState<Stage>(Stage.Deep);

  const data = route.params.data;

  useEffect(() => {
    navigation?.setOptions({title: route.params.data.date});
  }, [navigation, route.params.data.date]);

  const getCurrentField = useCallback(
    (givenData: SleepDataByLineItem) => {
      switch (selectedStage) {
        case Stage.Deep:
          return givenData.deep;
        case Stage.Light:
          return givenData.light;
        case Stage.Rem:
          return givenData.rem;
        default:
          throw new Error('Encountered new stage: ' + selectedStage);
      }
    },
    [selectedStage],
  );

  const heartData = getHeartRates(data);
  const moveData = getMovements(data);
  const respData = getRespirations(data);

  const tempData = getLineData(getSortedStages(data), 'temperature');

  return (
    <View>
      <View style={styles.switchContainer}>
        <SleepStageSwitch stage={selectedStage} setStage={setSelectedStage} />
      </View>
      <ScrollView>
        <SleepStagesPieGraph />
        <SleepDataByStageChart
          data={getCurrentField(tempData)}
          title="Temperature"
          units={'Celcius'}
          yAxisOffset={30}
          spacing={22}
          noOfSections={3}
          initialSpacing={10}
        />
        <Text style={styles.textField}>{JSON.stringify(tempData)}</Text>
        <Text style={styles.textField}>{JSON.stringify(heartData)}</Text>
        <Text style={styles.textField}>{JSON.stringify(moveData)}</Text>
        <Text style={styles.textField}>{JSON.stringify(respData)}</Text>
      </ScrollView>
    </View>
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
