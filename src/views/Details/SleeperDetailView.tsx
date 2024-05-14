import React, {useEffect, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../App';
import {Background} from '../../components/common';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {selectDidAnimateConfettiForUser, selectUserSleepDetailData} from '../../redux/sleep/selectors';
import {SleeperDataContent} from './SleeperDataContent';
import {ErrorContainer} from './ErrorContainer';
import {didUserAcceptSelection} from '../../redux/users/selectors';
import {setDidAnimateConfetti} from '../../redux/sleep/slice';
import {ConfettiCannon, ConfettiCannonRef} from '../../components/confetti/Cannon';

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
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectUserSleepDetailData(route.params.data.id));
  const didAccept = useAppSelector(didUserAcceptSelection(route.params.data.id));
  const didAnimate = useAppSelector(selectDidAnimateConfettiForUser(route.params.data.id));

  const confettiCannonRef = useRef<ConfettiCannonRef>(null);

  useEffect(() => {
    navigation?.setOptions({title: route.params.data.name});
  }, [navigation, route.params.data.name]);

  useEffect(() => {
    if (didAccept && !didAnimate) {
      if (confettiCannonRef.current !== null) {
        confettiCannonRef.current.start(() => {
          dispatch(setDidAnimateConfetti(route.params.data.id));
        });
      }
    }
  }, [didAccept, didAnimate, dispatch, route.params.data.id, confettiCannonRef]);

  return (
    <Background>
      {data ? (
        <>
          <SleeperDataContent
            data={data}
            userId={route.params.data.id}
            onSuggestionPress={() =>
              navigation.navigate('Suggestion', {data: route.params.data})
            }
          />
          <ConfettiCannon
            origin={{x: 200, y: 0}}
            count={175}
            ref={confettiCannonRef}
          />
        </>
      ) : (
        <ErrorContainer />
      )}
    </Background>
  );
};
