import React from 'react';
import {SleepText, SleepView} from '../../components/common';
import {strings} from '../../i18n';

/**
 * A stub error container
 * 
 * @returns 
 */
export const ErrorContainer = () => {
  return (
    <SleepView>
      <SleepText>{strings.error.generalError}</SleepText>
    </SleepView>
  );
};
