import React from 'react';
import ReactDOM from 'react-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'assets/styles/tailwind.css';
import 'assets/styles/index.css';
import 'assets/styles/responsive.css';

import App from 'App';
import { Provider } from 'react-redux';
import store from './store';

import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import 'primereact/resources/primereact.min.css'; //core css
import 'primeicons/primeicons.css';

import awsConfig from './aws-exports';
import AWS from 'aws-sdk';

AWS.config.update({
  region: awsConfig.aws_project_region,
  credentials: new AWS.CognitoIdentityCredentials({
    IdentityPoolId: awsConfig.aws_cognito_identity_pool_id,
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
