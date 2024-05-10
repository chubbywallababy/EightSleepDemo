import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Background, SleepText} from '../components/common';
import {useAppSelector} from '../redux/hooks';
import {selectUsersData} from '../redux/sleep/selectors';

type SleepDataDetailViewProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

export const SleeperDetailView = ({
  route,
  navigation,
}: SleepDataDetailViewProps) => {
  const data = useAppSelector(selectUsersData(route.params.data.id));

  useEffect(() => {
    navigation?.setOptions({title: route.params.data.name});
  }, [navigation, route.params.data.name]);

  return (
    <Background>
      <View style={styles.switchContainer}>
        <SleepText>{JSON.stringify(data)}</SleepText>
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
