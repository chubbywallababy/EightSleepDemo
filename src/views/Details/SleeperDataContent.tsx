import {ScrollView, StyleSheet, View} from 'react-native';
import {SleepText} from '../../components/common';
import {CircularProgress} from '../../components/CircularProgress';
import {SleepDetailData} from '../../utils/types';
import {getKpiColor} from '../../components/utils/getKpiColor';
import {strings} from '../../i18n';
import {SleepLinearGradient} from '../../components/SleepLinearGradient';
import {SleeperActionCell} from '../../components/SleeperActionCell';
import {Thermometer} from '../../components/images';

/**
 * 
 * This view shows all the data relevant to a sleeper analysis
 * 
 * It's the parent's responsibility to make sure the redux data is defined before presenting.
 * 
 * @param param0 
 * @returns 
 */
export const SleeperDataContent = ({data}: {data: SleepDetailData}) => {

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {data.hasBadScore ? <SleeperActionCell
                icon={<Thermometer />}
                details={strings.details.action.detail}
                title={strings.details.action.title}
                onPress={() => {
                    console.log("hello!");
                }}
            /> : null}
            <CircularProgress
                strokeWidth={10}
                percentageComplete={data.averageScore}
                radius={180}
                backgroundColor={getKpiColor(data.deepSleepDurationStatus) || "white"}
                unit={strings.units.percent}
                detailText={strings.details.sleepFitness}
            />
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: 10,
        gap: 20
    },
    textField: {
        padding: 20,
    },
});
