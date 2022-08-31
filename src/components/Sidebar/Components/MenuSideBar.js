import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuSideBar({ children, route, location, icon }) {
  return (
    <li className=' items-center hover:rounded hover:bg-gray-100 hover:pl-1'>
      <Link
        className={
          'text-xs uppercase py-3 font-bold block ' +
          (window.location.href.indexOf(location) !== -1
            ? 'border-sky-500  text-sky-500 hover:text-sky-600'
            : 'text-blueGray-700 hover:text-blueGray-500')
        }
        to={route}
      >
        <i
          className={
            icon +
            ' mr-2 text-sm ' +
            (window.location.href.indexOf(location) !== -1
              ? 'opacity-75'
              : 'text-blueGray-300')
          }
        ></i>{' '}
        {children}
      </Link>
    </li>
  );
}
