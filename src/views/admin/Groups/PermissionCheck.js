import React from 'react';

export default function PermissionCheck({ children, checked }) {
  return (
    <span className={`ml-4 text-${checked ? 'green' : 'red'}-400 font-medium`}>
      <i className={`pi pi-${checked ? 'check' : 'times'}`}></i> {children}
    </span>
  );
}
