import * as React from 'react';
import Helmet from 'react-helmet';
import { injectIntl } from 'gatsby-plugin-intl';

import { Step } from 'components/step/Step';

interface IProps {
  intl: any;
}

function one({ intl }: IProps) {
  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'step_one_title' })} />

      <Step
        num={1}
        title={intl.formatMessage({ id: 'step_one_title' })}
        text={intl.formatMessage({ id: 'step_one_text' })}
        video={''}
      />
    </>
  );
}

export default injectIntl(one);
