import {StyleSheet} from 'react-native';
import {colors} from './colors';

export const commonStyles = StyleSheet.create({
  background: {backgroundColor: colors.background},
  text: {color: colors.text},
  label: {color: '#888', fontSize: 14},
  view: {backgroundColor: colors.secondary},
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
