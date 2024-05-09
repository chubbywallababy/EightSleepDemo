import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {PieChart} from 'react-native-gifted-charts';

interface LegendItemProps {
  text: string;
  color: string;
}

const Legend: React.FC<LegendItemProps> = ({text, color}) => {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendColor, {backgroundColor: color || 'white'}]} />
      <Text style={styles.legendText}>{text || ''}</Text>
    </View>
  );
};

const CenterLabel = () => {
  return (
    <View style={styles.centerLabelContainer}>
      <Text style={styles.centerLabelText}>90</Text>
      <Text style={styles.centerLabelTotal}>Total</Text>
    </View>
  );
};

export const SleepStagesPieGraph = () => {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerText}>Quarterly Sales</Text>

        <PieChart
          strokeColor="white"
          strokeWidth={4}
          donut
          data={[
            {value: 30, color: 'rgb(84,219,234)'},
            {value: 40, color: 'lightgreen'},
            {value: 20, color: 'orange'},
          ]}
          innerCircleColor="#414141"
          innerCircleBorderWidth={4}
          innerCircleBorderColor={'white'}
          showValuesAsLabels={true}
          showText
          textSize={18}
          showTextBackground={true}
          centerLabelComponent={CenterLabel}
        />

        <View style={styles.legendContainer}>
          <Legend text="Jan" color="rgb(84,219,234)" />
          <Legend text="Feb" color="lightgreen" />
          <Legend text="Mar" color="orange" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 100,
    marginHorizontal: 30,
    borderRadius: 10,
    paddingVertical: 50,
    backgroundColor: '#414141',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  legendContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  legendItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  legendColor: {
    height: 18,
    width: 18,
    marginRight: 10,
    borderRadius: 4,
  },
  legendText: {
    color: 'white',
    fontSize: 16,
  },
  centerLabelContainer: {
    // No styles needed here (optional)
  },
  centerLabelText: {
    color: 'white',
  },
  centerLabelTotal: {
    color: 'white',
    fontSize: 18,
  },
});
