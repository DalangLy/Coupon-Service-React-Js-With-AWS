// import React from 'react';

import React, { useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { SignInAdapter } from './../../adapters/';
import { Messages } from 'primereact/messages';
import CircleLoadingIndicator from 'components/Loadings/CircleLoadingIndicator';
import getCurrentUserGroup from 'repository/group/getCurrentUserGroup';
import { Link, useHistory, useLocation, } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import findUserRepository from 'repository/user/findUserRepository';

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  let history = useHistory();
  let location = useLocation();
  const email = useRef('');
  const password = useRef('');
  const messages = useRef('');

  const onChangeEmail = (event) => (email.current = event.target.value);
  const onChangePassword = (event) => (password.current = event.target.value);


  const handleSubmit = async (event) => {
    event.preventDefault();
    messages.current.show();
    setLoading(true);
    await Auth.signIn(email.current, password.current)
      .then(async (user) => {
        setLoading(false);
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          const { requiredAttributes } = user.challengeParam; // the array of required attributes, e.g ['email', 'phone_number']
          Auth.completeNewPassword(
            user, // the Cognito User Object
            password.current // the new password
          )
            .then((user) => {})
            .catch((e) => {
              console.log(e);
            });
        }

        const group = await getCurrentUserGroup();
        const auth = await Auth.currentAuthenticatedUser();
        await findUserRepository(auth.username).then((res) => {
          localStorage.setItem('user', JSON.stringify(res));
        });

        if (group === undefined) {
          messages.current.show({
            severity: 'error',
            summary: '',
            detail: 'Unauthorize please contact ur administrators.',
            sticky: true,
          });
          return;
        }

        if (group?.includes('Guests')) {
          window.location.href = '/admin/generate-coupon';
          //history.replace("/admin/generate-coupon")
        } else if (group?.includes('Supports') || group?.includes('Finances')) {
          window.location.href = '/admin/users';
          //history.replace("/admin/users")
        } else {
          //navigate to admin panel after logged in (not allow back button)
          window.location.href = '/admin/dashboard';
          //history.replace("/admin/dashboard")
        }
      })
      .catch((err) => {
        if (err?.code === 'UserNotFoundException') {
          messages.current.show({
            severity: 'error',
            summary: '',
            detail: err?.message ?? err,
            life: 30000,
          });
        } else {
          messages.current.show({
            severity: 'error',
            summary: '',
            detail: err?.message ?? err,
            life: 30000,
          });
        }

        setLoading(false);
      });
  };

  const forgetPassword = () => {
    messages.current.show({
      severity: 'error',
      summary: '',
      detail: 'Please contact administrator to reset password',
      life: 30000,
    });
  };

  return (
    <div className='container mx-auto px-4 h-full'>
      <div className='flex content-center items-center justify-center h-full '>
        <div className='w-full sm:w-12/12 md:w-9/12  lg:w-6/12 px-4'>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
            <div className='rounded-t mb-0 px-6 py-6'>
              <div className='text-center mb-3'>
                <h1 className='text-q-800 text-2xl font-bold uppercase '>
                  Coupon Service
                </h1>
              </div>

              <hr className='mt-6 border-b-1 border-blueGray-300' />
            </div>
            <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
              <form onSubmit={handleSubmit}>
                <Messages ref={messages}></Messages>

                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Email
                  </label>
                  <input
                    type='email'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    placeholder='Email'
                    onChange={onChangeEmail}
                  />
                </div>

                <div className='relative w-full mb-3'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor='grid-password'
                  >
                    Password
                  </label>
                  <input
                    type='password'
                    className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                    placeholder='Password'
                    onChange={onChangePassword}
                    autoComplete='true'
                  />
                </div>
                <div className='mt-6'>
                  <label className='inline-flex items-center cursor-pointer'>
                    <input
                      id='customCheckLogin'
                      type='checkbox'
                      className='form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                    />
                    <span className='ml-2 text-sm font-semibold text-blueGray-600'>
                      Remember me
                    </span>
                  </label>
                </div>

                <div className='text-center mt-6'>
                  <button
                    className='bg-sky-600 w-full text-white active:bg-sky-200 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150'
                    type='submit'
                  >
                    {isLoading === true ? <CircleLoadingIndicator /> : ''}
                    Sign In
                  </button>
                </div>

                <div className='text-center mt-6'>
                  <h6 className='text-sm '>
                    Remember password ?
                    <span
                      className='font-bold text-sky-500 cursor-pointer'
                      onClick={forgetPassword}
                    >
                      Forget password
                    </span>
                    {/* <Link to={'/register'}>
                      <span className='font-bold text-sky-500'>
                        Create an account
                      </span>
                    </Link> */}
                  </h6>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}