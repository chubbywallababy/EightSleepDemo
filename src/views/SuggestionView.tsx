import React, {useCallback} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {CardTitle, SleepText} from '../components/common';
import {strings} from '../i18n';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {StyleSheet} from 'react-native';
import {colors} from '../styles/colors';
import {useAppDispatch} from '../redux/hooks';
import {acceptSuggestion, denySuggestion} from '../redux/users/slice';

type SuggestionViewProps = NativeStackScreenProps<
  RootStackParamList,
  'Suggestion'
>;

/**
 * A view for a user to view and accept suggestions. This is currently only a view with text and buttons.
 *
 * Future improvements would be to include a graph like the one in the mocks
 */
export const SuggestionView = ({route, navigation}: SuggestionViewProps) => {
  const dispatch = useAppDispatch();

  const makeSelection = useCallback(
    (accept: boolean) => {
      if (accept) {
        dispatch(acceptSuggestion(route.params.data.id));
      } else {
        dispatch(denySuggestion(route.params.data.id));
      }
      navigation.goBack();
    },
    [dispatch, route, navigation],
  );

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <CardTitle style={[styles.text, styles.title]}>
          {strings.suggestion.title}
        </CardTitle>
        <SleepText style={[styles.text, styles.suggestionText]}>
          {strings.suggestion.text}
        </SleepText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => makeSelection(true)}
          style={[styles.button, styles.primaryButton]}>
          <SleepText style={styles.buttonText}>
            {strings.common.acceptChanges}
          </SleepText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => makeSelection(false)}
          style={styles.button}>
          <SleepText style={styles.buttonText}>
            {strings.common.notTonight}
          </SleepText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding: 8,
    gap: 20,
  },
  cardContainer: {
    padding: 8,
    gap: 12,
  },
  text: {
    textAlign: 'center',
  },
  suggestionText: {
    fontSize: 16,
  },
  title: {
    textTransform: 'capitalize',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '700',
  },
  button: {
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  buttonContainer: {
    gap: 8,
  },
});
