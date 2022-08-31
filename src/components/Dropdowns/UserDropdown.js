import React from 'react';
import { createPopper } from '@popperjs/core';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../src/reducers/authReducer';
import { useHistory } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Avatar } from 'primereact/avatar';

const UserDropdown = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.auth.user);
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: 'bottom-start',
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const logOut = async (e) => {
    e.preventDefault();
    dispatch(logout());
    await Auth.signOut({ global: true });
    window.location.href = '/login';
    dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
  };

  return (
    <>
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center flex">
          <span className="w-12 h-12 text-sm text-white  inline-flex items-center justify-center rounded-full">
            <Avatar
              label={
                ''
                // user['email'].charAt(0).toUpperCase()
                // user['custom:lastName'].charAt(0)
              }
              shape="circle"
              className="bg-sky-600"
            />
            {/* <img
              alt='...'
              className='w-full rounded-full align-middle border-none shadow-lg'
              src={require('assets/img/team-1-800x800.jpg').default}
            /> */}
          </span>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? 'block ' : 'hidden ') +
          'bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48'
        }
      >
        <div
          className="text-sm py-2 hover:bg-blue-400 hover:cursor-pointer hover:text-white px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          onClick={() => {
            history.push('/admin/profile/123123');
            dropdownPopoverShow
              ? closeDropdownPopover()
              : openDropdownPopover();
          }}
        >
          <i className="pi pi-user mr-2"></i> My Profile
        </div>
        <a
          href="#pablo"
          className={
            'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700 hover:bg-blue-400 hover:text-white'
          }
          onClick={logOut}
        >
          <i className="pi pi-sign-out mr-2"></i> Sign Out
        </a>

        {/* <div className='h-0 my-2 border border-solid border-blueGray-100' /> */}
      </div>
    </>
  );
};

export default UserDropdown;
