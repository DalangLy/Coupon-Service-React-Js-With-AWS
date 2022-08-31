import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React, { useState, useRef, useEffect } from 'react';
import UserForm from './UserForm';
import { addOneItem } from 'reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRole } from 'reducers/userRoleReducer';
import { Messages } from 'primereact/messages';
import createUserRepository from 'repository/user/createUserRepository';
import LoadingDialog from 'components/Dialogs/LoadingDialog';

export default function CreateUser() {
  const [isLoading, setIsLoading] = useState(false);
  const createMessage = useRef(null);

  const dispatch = useDispatch();
  const isRoleLoaded = useSelector((state) => state.userRole.isLoading);

  useEffect(() => {
    if (isRoleLoaded) dispatch(fetchUserRole());
  }, [isRoleLoaded, dispatch]);

  const handleSubmit = async (event, user) => {
    setIsLoading(true);
    let message = {
      severity: '',
      summary: '',
      detail: '',
      sticky: true,
    };

    try {
      if (user.password !== user.confirmPassword) {
        message.severity = 'error';
        message.detail = 'The password and confirm password does not match!';
      } else if (user.groups.length <= 0) {
        message.severity = 'error';
        message.detail = 'User must have one group.';
      } else {
        const data = await createUserRepository(user);
        dispatch(addOneItem(data));
        message.severity = 'success';
        message.detail = 'Create user successfully.';
      }
    } catch (e) {
      console.log(e);
      message.severity = 'error';
      message.detail = 'Opp something error.';
    }
    setIsLoading(false);
    createMessage.current.show([message]);
  };

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 h-full rounded-lg  border-0 px-3'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton></ArrowBackButton>
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Create Users
            </h6>
          </div>
        </div>

        <div className='flex-auto px-4 lg:px-10 py-10 pt-0 mt-7 bg-white'>
          <div className='px-3'>
            <Messages ref={createMessage} />
          </div>

          <LoadingDialog visible={isLoading} />

          <UserForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}
