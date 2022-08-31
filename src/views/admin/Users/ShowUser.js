import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React from 'react';
import { useParams } from 'react-router-dom';
import UserForm from './UserForm';

export default function ShowUser() {
  const { id } = useParams();

  const handleSubmit = async (event, customer) => {
    event.preventDefault();
  };

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Customer
            </h6>
          </div>
        </div>

        <div className='flex-auto px-4 lg:px-10 py-10 pt-0 mt-7'>
          <UserForm
            handleSubmit={handleSubmit}
            isEdit={true}
            userId={id}
            disable={true}
          />
        </div>
      </div>
    </>
  );
}
