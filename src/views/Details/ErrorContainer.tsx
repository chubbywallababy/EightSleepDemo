import {SleepText, SleepView} from '../../components/common'
import {strings} from '../../i18n'

export const ErrorContainer = () => {
    return (
        <SleepView>
            <SleepText>{strings.error.generalError}</SleepText>
        </SleepView>
    )
}