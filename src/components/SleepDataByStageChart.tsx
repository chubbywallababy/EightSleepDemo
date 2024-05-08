import {StyleSheet, Text, View} from 'react-native';
import {LineChart, lineDataItem} from 'react-native-gifted-charts';

interface SleepDataByStageChartProps {
    data: lineDataItem[];
    title: string;
    units: string;
    yAxisOffset: number;
    noOfSections: number;
    spacing: number;
    initialSpacing: number;
}

export const SleepDataByStageChart = ({data: lineData, title, yAxisOffset, noOfSections, spacing, initialSpacing}: SleepDataByStageChartProps) => {

    if (lineData.find(d => d === undefined)) {
        throw new Error("Should not have undefined value: " + JSON.stringify(lineData));
    }

    return (
        <View style={styles.conatiner}>
            <Text style={styles.text}>
                {title}
            </Text>
            <View
                style={styles.chartContainer}>
                <LineChart
                    data={lineData}
                    yAxisOffset={yAxisOffset}
                    spacing={spacing}
                    noOfSections={noOfSections}
                    initialSpacing={initialSpacing}
                    isAnimated
                    animateTogether
                    thickness={3}
                    color="#07BAD1"
                    xAxisLength={200}
                    animateOnDataChange
                    animationDuration={1000}
                    onDataChangeAnimationDuration={300}
                    yAxisTextStyle={{color: 'lightgray'}}
                    hideDataPoints
                    startFillColor={'rgb(84,219,234)'}
                    endFillColor={'rgb(84,219,234)'}
                    startOpacity={0.4}
                    endOpacity={0.1}
                    backgroundColor="#414141"
                    rulesColor="gray"
                    rulesType="solid"
                    yAxisColor="lightgray"
                    xAxisColor="lightgray"
                    showDataPointOnFocus
                    showStripOnFocus
                    focusEnabled
                    showTextOnFocus
                    dataPointsColor1="white"
                    xAxisIndicesColor="white"
                    curved
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    chartContainer: {
        paddingVertical: 20,
        backgroundColor: '#414141',
    },
    text: {
        fontSize: 24,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    conatiner: {
        marginVertical: 10
    }
})