import * as React from 'react';
import { render } from 'react-dom';
import { App } from '~copmponents/app/app';
import { PageWrapper } from './pageWrapper';

const rootEl = document.getElementById('app');

render(
  <PageWrapper>
    <App />
  </PageWrapper>,
  rootEl
);
