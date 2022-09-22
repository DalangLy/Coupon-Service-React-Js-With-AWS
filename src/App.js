import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Admin from 'layouts/Admin.js';
import Login from 'views/auth/Login';
import NotFound from 'views/NotFound';
import PrivateRoute from 'views/auth/PrivateRoute';
import amplifyConfig from './aws-exports';
import Amplify  from 'aws-amplify';
// import Register from 'views/auth/Register';
import { useLottie } from 'lottie-react';
import loadingPage from './lotties/83491-loading.json';
import { useDispatch, useSelector } from 'react-redux';
import getCurrentAuthenticatedUser from 'adapters/getCurrentAuthenticatedUser';
import { authGetUser } from 'reducers/authReducer';
import ErrorBoundary from 'views/admin/ErrorBoundary';
Amplify.configure(amplifyConfig);

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isInitPage, setIsInitPage] = useState(true);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  useEffect(() => {
    if (loading) getUserAuth();
  }, []);

  const options = {
    animationData: loadingPage,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  async function getUserAuth() {
    setTimeout(async () => {
      await getCurrentAuthenticatedUser()
          .then((res) => {
            setAuthenticated(true);
            if (loading) dispatch(authGetUser(res));
          })
          .catch((e) => {
          });
      setIsInitPage(false);
    }, 0);
  }

  return (
    <>
      <ErrorBoundary>
        {isInitPage ? (
          <div className='w-full h-full grid place-content-center'>
            <div className='w-100 h-100 mx-auto'>{View}</div>
          </div>
        ) : (
          <BrowserRouter>
            <Switch>
              {/* add routes with layouts */}
              <PrivateRoute
                path='/admin'
                component={Admin}
                authenticated={authenticated}
              />
              {/* <Route path='/auth' component={Auth} /> */}
              <Route path='/login' component={Login} />
              {/* <Route path='/register' component={Register} /> */}
              <Route from='/404' component={NotFound} />
              {/* <Redirect from='/' to='/login' /> */}
              <Redirect from='*' to='/admin/dashboard' />
            </Switch>
          </BrowserRouter>
        )}
      </ErrorBoundary>
    </>
  );
}
