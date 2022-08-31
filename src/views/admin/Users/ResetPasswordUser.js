import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import BackButton from 'components/Buttons/BackButton';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import CustomTextInput from 'components/TextFields/CustomTextInput';
import { Messages } from 'primereact/messages';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import resetUserPasswordRepository from 'repository/user/resetUserPasswordRepository';

export default function ResetPasswordUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const messages = useRef('');
  const [user, setUser] = useState({});

  const users = useSelector((state) => state.users.data);
  const { id } = useParams();

  useEffect(() => {
    let data = users.filter((e) => e.id === id);
    if (data.length > 0) {
      setUser(data[0]);
    }
  }, [id, users]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (password !== confirmPassword) {
      messages.current.show({
        severity: 'error',
        summary: 'Password not match confirm password!',
        // detail: 'Order submitted',
      });
    } else {
      await resetUserPasswordRepository(id, password)
        .then((res) => {
          messages.current.show({
            severity: res.success ? 'success' : 'error',
            detail:
              res.message !== undefined ? res.message : res.errors.message,
            sticky: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg px-3 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              {user.name}
            </h6>
          </div>
        </div>

        <LoadingDialog visible={isLoading} />

        <div className='flex-auto px-4 lg:px-10 py-10 pt-0 mt-7 h-full bg-white'>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='p-3 lg:w-6/12'>
              <Messages ref={messages} />
            </div>

            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <CustomTextInput
                    label='New Password'
                    value={password}
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='flex flex-wrap'>
              <div className='w-full lg:w-6/12 px-4'>
                <div className='relative w-full mb-3'>
                  <CustomTextInput
                    label='Confirm Password'
                    type='password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className='flex flex-row-reverse mt-12 lg:w-6/12 '>
              <button
                className='bg-sky-600 text-white active:bg-sky-200 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150'
                type='submit'
              >
                Reset
              </button>
              <div className='mx-3'></div>
              <BackButton />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
