import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import {useAppDispatch, useAppSelector} from '../redux/hooks';
import {useNavigation} from './hooks/useNavigation';
import {Background, SleepText, SleepView} from '../components/common';
import {
  selectUsers,
  selectUsersError,
  selectUsersStatus,
} from '../redux/users/selectors';
import {SleeperCell} from '../components/SleeperCell';
import {usersActions} from '../redux/users/actions';

export const SleepersListView = () => {
  const navigation = useNavigation();

  const [didLoad, setDidLoad] = useState(false);
  const data = useAppSelector(selectUsers);
  const status = useAppSelector(selectUsersStatus);
  const error = useAppSelector(selectUsersError);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!didLoad) {
      dispatch(usersActions.fetchUsers());
      setDidLoad(true);
    }
  }, [dispatch, didLoad]);

  return (
    <Background style={styles.container}>
      {status === 'loading' ? <ActivityIndicator size="large" /> : null}
      {status === 'failed' ? (
        <SleepView>
          <SleepText>Sorry, something went wrong...</SleepText>
          {error ? <SleepText>{error}</SleepText> : null}
        </SleepView>
      ) : null}
      {data.length === 0 && status === 'idle' ? (
        <Text>There are no users available for analysis</Text>
      ) : null}
      {data.length > 0 && status === 'idle' ? (
        <FlatList
          style={styles.list}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item}) => (
            <SleeperCell
              data={item}
              onPress={() => navigation?.navigate('Details', {data: item})}
            />
          )}
          ItemSeparatorComponent={Separator}
        />
      ) : null}
    </Background>
  );
};

const Separator = () => <View style={styles.separator} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
    width: '100%',
    marginVertical: 20,
  },
  separator: {height: 12},
});
