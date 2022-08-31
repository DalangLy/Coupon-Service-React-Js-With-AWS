// import React from 'react';

import React, { useState, useRef } from 'react';

import { useHistory } from 'react-router-dom';
import { Messages } from 'primereact/messages';
import CustomTextInput from 'components/TextFields/CustomTextInput';
import CircleLoadingIndicator from 'components/Loadings/CircleLoadingIndicator';
import SignUpAdapter from 'adapters/SignUpAdapter';
import { Auth } from 'aws-amplify';

export default function Login() {
  const [isLoading, setLoading] = useState(false);

  const history = useHistory();

  const messages = useRef('');
  const firstName = useRef('');
  const lastName = useRef('');
  const email = useRef('');
  const phone = useRef('');
  const password = useRef('');
  const cfpassword = useRef('');
  const company = useRef('');
  const address = useRef('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const user = {
      firstName: firstName.current,
      lastName: lastName.current,
      email: email.current,
      phone: phone.current,
      password: password.current,
      company: company.current,
      address: address.current,
      userType: 'Guests',
    };

    if (password.current !== cfpassword.current) {
      messages.current.show({
        severity: 'error',
        summary: '',
        detail: 'Password not match confirm password.',
        life: 100000,
      });
    } else {
      await await SignUpAdapter(user)
        .then(async (res) => {
          await Auth.signOut();
          history.push('/login');
        })
        .catch((err) => {
          messages.current.show({
            severity: 'error',
            summary: '',
            detail: err?.message,
            life: 100000,
          });
        });
    }

    setLoading(false);
  };

  function phonenumber(inputtxt) {
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (inputtxt.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className='container mx-auto  h-full'>
      <div className='flex content-center items-center justify-center h-full'>
        <div className='w-full md:w-8/12 '>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0 p-6'>
            <div className='rounded-t mb-0 px-6 py-6'>
              <div className='text-center mb-3'>
                <h1 className='text-q-800 text-2xl font-bold uppercase '>
                  Create a Account
                </h1>
              </div>

              <hr className='mt-6 border-b-1 border-blueGray-300' />
            </div>
            <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
              <form onSubmit={handleSubmit}>
                <Messages ref={messages}></Messages>

                <div className='relative w-full my-1'>
                  <div className='flex flex-wrap'>
                    <div className='w-full lg:w-6/12 px-2'>
                      <CustomTextInput
                        label='First Name'
                        placeholder='First Name'
                        onChange={(e) => {
                          firstName.current = e.target.value;
                        }}
                      />
                    </div>
                    <div className='w-full lg:w-6/12 px-2'>
                      <CustomTextInput
                        label='Last Name'
                        placeholder='Last Name'
                        onChange={(e) => {
                          lastName.current = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='relative w-full my-1'>
                  <div className='flex flex-wrap'>
                    <div className='w-full lg:w-6/12 px-2'>
                      <CustomTextInput
                        label='email'
                        type='mail'
                        placeholder='Email'
                        onChange={(e) => {
                          email.current = e.target.value;
                        }}
                      />
                    </div>
                    <div className='w-full lg:w-6/12 px-2'>
                      <CustomTextInput
                        label='phone'
                        type='number'
                        placeholder='Phone'
                        onChange={(e) => {
                          phone.current = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='relative w-full my-1 '>
                  <div className='flex flex-wrap'>
                    <div className='w-full lg:w-6/12 px-2'>
                      <CustomTextInput
                        label='password'
                        type='password'
                        placeholder='password'
                        onChange={(e) => {
                          password.current = e.target.value;
                        }}
                      />
                    </div>
                    <div className='w-full lg:w-6/12 px-2'>
                      <CustomTextInput
                        label='confirm password'
                        type='password'
                        placeholder='confirm password'
                        onChange={(e) => {
                          cfpassword.current = e.target.value;
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className='relative w-full my-1 px-2'>
                  <CustomTextInput
                    label='Company Name'
                    placeholder='Company Name'
                    onChange={(e) => {
                      company.current = e.target.value;
                    }}
                  />
                </div>

                <div className='relative w-full my-1 px-2'>
                  <CustomTextInput
                    label='address'
                    placeholder='company address'
                    onChange={(e) => {
                      address.current = e.target.value;
                    }}
                  />
                </div>

                <div className='mt-8'>
                  <label className='inline-flex items-center cursor-pointer'>
                    <input
                      id='customCheckLogin'
                      type='checkbox'
                      className='form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                    />
                    <span className='ml-2 text-sm font-semibold text-blueGray-600'>
                      I agree with the{' '}
                      <a
                        href='#pablo'
                        className='text-sky-500'
                        onClick={(e) => e.preventDefault()}
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <div className='text-center mt-6'>
                  <button
                    className='bg-sky-600 w-full text-white active:bg-sky-200 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150'
                    type='submit'
                  >
                    {isLoading === true ? (
                      <CircleLoadingIndicator></CircleLoadingIndicator>
                    ) : (
                      ''
                    )}
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
