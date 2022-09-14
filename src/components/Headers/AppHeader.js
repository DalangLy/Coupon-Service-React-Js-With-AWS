import React from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { OverlayPanel } from 'primereact/overlaypanel';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { Badge } from 'primereact/badge';

export default function AppHeader({ notificationCount, collapseMenu }) {
  const op = React.useRef(null);
  const notificationPopOverlayPanel = React.useRef();
  const history = useHistory();
  const auth = useSelector((state) => state.auth.user);

  const logOut = async (e) => {
    op.current.toggle(e);
    await Auth.signOut();
    window.location.href = '/login';
  };

  const redirectToProfile = async (e) => {
    op.current.toggle(e);
    const user = await Auth.currentAuthenticatedUser();
    history.push('/admin/profile/' + user.username);
  };

  return (
    <header className='py-5 px-8 bg-white flex '>
      <div className='lg:w-2/12 flex'>
        <div className=' text-lg uppercase font-bold mr-5 self-center'>
          <span>Coupon</span> <span className='text-sky-400'>Management</span>
        </div>

        <div
          onClick={() => collapseMenu()}
          className='self-center px-3 py-1.5 bg-sky-200 text-gray-600 rounded cursor-pointer hover:bg-sky-600 hover:text-white'
        >
          <i className='pi pi-align-justify font-bold'></i>
        </div>
      </div>

      <div className='ml-5 lg:w-3/12 self-center md:w-64'>
        {/*<span className='p-input-icon-left w-full'>*/}
        {/*  <i className='pi pi-search' />*/}
        {/*  <InputText className='w-full' placeholder='Search' />*/}
        {/*</span>*/}
      </div>
      <div className='ml-5 lg:w-8/12  md:w-64 flex flex-row-reverse'>
        <OverlayPanel ref={op} className='shadow-lg'>
          <div className='w-56'>
            <div
              onClick={redirectToProfile}
              className='p-3 hover:bg-sky-200 hover:text-sky-800 hover:rounded-lg cursor-pointer transition duration-150 ease-in-out'
            >
              <i className='pi pi-cog mr-3'></i> Account Setting
            </div>
            <div
              onClick={logOut}
              className='p-3 hover:bg-sky-200 hover:text-sky-800 hover:rounded-lg cursor-pointer transition duration-150 ease-in-out'
            >
              <i className='pi pi-sign-in mr-3'></i> Sign out
            </div>
          </div>
        </OverlayPanel>
        <div
          onClick={(e) => op.current.toggle(e)}
          className='my-1 px-3  bg-sky-200 rounded-lg mr-3 cursor-pointer hover:bg-sky-500 hover:text-white transition duration-150 ease-in-out flex items-center'
        >
          <i className='pi pi-cog mr-3'></i>
          <div>
            {`${auth?.firstName} ${auth?.lastName}`}
            {/*{auth?.firstName?.charAt(0)?.toUpperCase()}*/}
            {/*{auth?.lastName?.charAt(0)?.toUpperCase()}*/}
          </div>
        </div>
        {/*<div*/}
        {/*  className='self-center px-3 py-2 bg-sky-200 rounded-lg mr-3 cursor-pointer hover:bg-sky-500 hover:text-white transition duration-150 ease-in-out'*/}
        {/*  onClick={(e) => {*/}
        {/*    notificationPopOverlayPanel.current.toggle(e)*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <i*/}
        {/*    className='pi pi-bell mr-4 p-text-secondary p-overlay-badge'*/}
        {/*    style={{ fontSize: '1rem' }}*/}
        {/*  >*/}
        {/*    <Badge*/}
        {/*      value={notificationCount ?? 0}*/}
        {/*      severity='danger'*/}
        {/*      className='text-xs'*/}
        {/*    ></Badge>*/}
        {/*  </i>*/}
        {/*</div>*/}

        {/*<OverlayPanel ref={notificationPopOverlayPanel}>*/}
        {/*  // Content*/}
        {/*</OverlayPanel>*/}
      </div>
    </header>
  );
}

AppHeader.propTypes = {
  collapseMenu: PropTypes.func,
};
