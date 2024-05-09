import React, {useRef} from 'react';
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Stage, STAGES} from '../types';

interface SleepStageSwitchProps {
  stage: Stage;
  setStage: (stage: Stage) => void;
}

export const SleepStageSwitch: React.FC<SleepStageSwitchProps> = ({
  stage,
  setStage,
}) => {
  // Animated values
  const animation = useRef(new Animated.Value(0)).current;

  // Calculate the width of each option
  const optionWidth = Dimensions.get('window').width / STAGES.length;

  // Function to handle option press
  const handlePress = (selectedStage: Stage) => {
    // Move the animation to the selected option
    Animated.timing(animation, {
      toValue: STAGES.indexOf(selectedStage) * optionWidth,
      duration: 150,
      useNativeDriver: false,
    }).start();

    // Set the selected stage
    setStage(selectedStage);
  };

  return (
    <View>
      <Text style={styles.title}>{'Sleep stage'}</Text>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.background,
            {
              transform: [{translateX: animation}],
              width: optionWidth,
            },
          ]}
        />
        {STAGES.map(stageOption => (
          <TouchableOpacity
            key={stageOption}
            style={styles.option}
            onPress={() => handlePress(stageOption)}>
            <Text
              style={[
                styles.label,
                stage === stageOption && styles.selectedLabel,
              ]}>
              {stageOption}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    margin: 10,
  },
  option: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  selectedLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: '#414141',
    borderRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
