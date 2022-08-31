import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBarItem({ children, route }) {
  const isPath = window.location.href.indexOf(route) !== -1;

  return (
    <Link to={route}>
      <div
        className={`
      ${
        isPath ? 'bg-sky-200 text-sky-900 font-medium' : ''
      } text-sm my-1 pl-5 py-3 rounded-lg hover:bg-sky-200 hover:text-sky-600 transition duration-150 ease-in-out cursor-pointer`}
      >
        <span>{children}</span>
      </div>
    </Link>
  );
}
