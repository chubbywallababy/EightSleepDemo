import {ScrollView, StyleSheet} from 'react-native';
import {CircularProgress} from '../../components/CircularProgress';
import {SleepDetailData} from '../../utils/types';
import {getKpiColor} from '../../components/utils/getKpiColor';
import {strings} from '../../i18n';
import {SleeperActionCell} from '../../components/SleeperActionCell';
import {Thermometer} from '../../components/images';
import {SleepStatCard} from '../../components/SleepStatCard';

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
            <SleepStatCard
                title="Sleep score"
                subtitle="hi"
                data="40"
                labels={["0", "25", "50", "75", "100"]}
                lineRange={{min: 0, max: 100}}
                goalRange={{min: 20, max: 40}}
                statValue={40}
            />
            <SleepStatCard
                title="Time slept"
                subtitle="hi"
                data="8.5"
                labels={["4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h"]}
                lineRange={{min: 4, max: 11}}
                goalRange={{min: 7, max: 9}}
                statValue={8.5}
            />
            <SleepStatCard
                title="Sleep score"
                subtitle="hi"
                data="40"
                labels={["0", "25", "50", "75", "100"]}
                lineRange={{min: 0, max: 100}}
                goalRange={{min: 20, max: 40}}
                statValue={40}
            />
            <SleepStatCard
                title="Time slept"
                subtitle="hi"
                data="8.5"
                labels={["4h", "5h", "6h", "7h", "8h", "9h", "10h", "11h"]}
                lineRange={{min: 4, max: 11}}
                goalRange={{min: 7, max: 9}}
                statValue={8.5}
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
