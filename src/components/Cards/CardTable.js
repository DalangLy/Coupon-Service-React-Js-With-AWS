import React from 'react';
import PropTypes from 'prop-types';

// components

export default function CardTable({ title, headers, children, color }) {
  return (
    <>
      <div
        className={
          'relative flex flex-col min-w-0 break-words w-full mb-6 shadow-md rounded ' +
          (color === 'light' ? 'bg-white' : 'bg-sky-900 text-white')
        }
      >
        {/* <div className='rounded-t mb-0 px-4 py-3 border-0'>
          <div className='flex flex-wrap items-center'>
            <div className='relative w-full px-4 max-w-full flex-grow flex-1'>
              <h3
                className={
                  'font-semibold text-lg ' +
                  (color === 'light' ? 'text-blueGray-700' : 'text-white')
                }
              >
                {title}
              </h3>
            </div>
          </div>
        </div> */}
        <div className='block w-full overflow-x-auto'>
          {/* Projects table */}
          <table className='items-center w-full bg-transparent border-collapse'>
            <thead>
              <tr>
                <th
                  key={'no'}
                  className='px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100 text-sm'
                ></th>
                {headers.map((e) => (
                  <th
                    key={e}
                    className='px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100 text-sm'
                  >
                    {e}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {children}
              {/* {Array.isArray(data) && data.length > 0 ? (
                data.map((value) => (
                  <tr key={value.id}>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                      <div className='flex'>{value.id}</div>
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                      <div className='flex'>{value.name}</div>
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                      <div className='flex'>{value.phone}</div>
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                      <div className='flex'>{value.email}</div>
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                      <div className='flex'>{value.company}</div>
                    </td>
                    <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                      <TableDropdown />
                    </td>
                  </tr>
                ))
              ) : (
                <tr></tr>
              )} */}
              {/* <tr> */}
              {/* <th className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center'>
                  <span
                    className={
                      'ml-3 font-bold ' +
                      +(color === 'light' ? 'text-blueGray-600' : 'text-white')
                    }
                  >
                    Argon Design System
                  </span>
                </th> */}
              {/* <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                  Argon Design System
                </td>

                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                  $2,500 USD
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                  <i className='fas fa-circle text-orange-500 mr-2'></i> pending
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                  <div className='flex'>email@example.com</div>
                </td>
                <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-sm'>
                  <div className='flex items-center'>
                    <span className='mr-2'>60%</span>
                    <div className='relative w-full'>
                      <div className='overflow-hidden h-2 text-xs flex rounded bg-red-200'>
                        <div
                          style={{ width: '60%' }}
                          className='shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500'
                        ></div>
                      </div>
                    </div>
                  </div>
                </td> */}

              {/* {typeof children === Object} */}

              {/* <td className='border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right'>
                  <TableDropdown />
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

CardTable.defaultProps = {
  color: 'light',
};

CardTable.propTypes = {
  color: PropTypes.oneOf(['light', 'dark']),
};
