import React from 'react';

export default function MainBody({ collapseMenu, children }) {
  return (
    <main
      className={`main-container float-right  min-h-screen-90 px-2  ${
        collapseMenu ? 'main-hide' : 'w-10/12'
      }`}
    >
      <div className='h-full rounded-lg min-h-fit-content '>{children}</div>
    </main>
  );
}
