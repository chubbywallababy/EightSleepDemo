import React, {useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {Background} from '../../components/common';
import {useAppSelector} from '../../redux/hooks';
import {selectUserSleepDetailData} from '../../redux/sleep/selectors';
import {SleeperDataContent} from './SleeperDataContent';
import {ErrorContainer} from './ErrorContainer';

type SleepDataDetailViewProps = NativeStackScreenProps<
  RootStackParamList,
  'Details'
>;

/**
 * The parent view for the sleep detail content.
 *
 * This view is responsible for setting the title and data validation
 */
export const SleeperDetailView = ({
  route,
  navigation,
}: SleepDataDetailViewProps) => {
  const data = useAppSelector(selectUserSleepDetailData(route.params.data.id));

  useEffect(() => {
    navigation?.setOptions({title: route.params.data.name});
  }, [navigation, route.params.data.name]);

  return (
    <Background>
      {data ? <SleeperDataContent data={data} /> : <ErrorContainer />}
    </Background>
  );
};
