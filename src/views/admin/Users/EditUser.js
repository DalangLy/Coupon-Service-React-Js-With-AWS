import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserForm from './UserForm';
import { onUpdateUserReducer } from 'reducers/userReducer';
import { Messages } from 'primereact/messages';
import updateUserRepository from 'repository/user/updateUserRepository';
import addUserToGroupRepository from 'repository/group/addUserToGroupRepository';
import removeUserFromGroupRepository from 'repository/group/removeUserFromGroupRepository';
import LoadingDialog from 'components/Dialogs/LoadingDialog';

export default function EditUser() {
  const [isLoading, setIsLoading] = useState('');
  const updateMessage = useRef(null);

  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.data);
  const { id } = useParams();

  const handleSubmit = async (event, user) => {
    event.preventDefault();
    setIsLoading(true);

    await updateUserRepository(user)
      .then((result) => {
        for (const key in groups) {
          if (user.groups.includes(groups[key].name)) {
            addUserToGroupRepository(user.groups[key], user.id);
          } else {
            removeUserFromGroupRepository(groups[key].name, user.id);
          }
        }
        dispatch(onUpdateUserReducer(result.data.updateUser));
        updateMessage.current.show({
          severity: 'success',
          // summary: 'Info Message',
          detail: 'Update successfully',
        });
      })
      .catch((err) => {
        updateMessage.current.show({
          severity: 'error',
          // summary: 'Info Message',
          detail: 'Opp',
        });
      });
    setIsLoading(false);
  };

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg  border-0 px-3'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex'>
            <ArrowBackButton />
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Edit Users
            </h6>
          </div>
        </div>

        <div className='flex-auto px-4 lg:px-10 py-10 pt-0 mt-7 bg-white'>
          <Messages ref={updateMessage} />
          <LoadingDialog visible={isLoading} />
          <UserForm handleSubmit={handleSubmit} isEdit={true} userId={id} />
        </div>
      </div>
    </>
  );
}
