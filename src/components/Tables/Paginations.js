function Pagination() {
  return (
    <>
      <div className='bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 '>
        <div className='flex flex-row-reverse ...'></div>

        <div className='sm:flex-1 sm:flex sm:items-center flex flex-row-reverse'>
          <div>
            <nav
              className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
              aria-label='Pagination'
            >
              <div className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                <span className='sr-only'>Previous</span>
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                    clipRule={'evenodd'}
                  />
                </svg>
              </div>
              <div
                aria-current='page'
                className='z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium'
              >
                {' '}
                1{' '}
              </div>
              <div className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'>
                {' '}
                2{' '}
              </div>
              <div className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium'>
                {' '}
                3{' '}
              </div>
              <span className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
                {' '}
                ...{' '}
              </span>
              <div className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium'>
                {' '}
                8{' '}
              </div>
              <div className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'>
                {' '}
                9{' '}
              </div>
              <div className='bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium'>
                {' '}
                10{' '}
              </div>
              <div className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'>
                <span className='sr-only'>Next</span>
                <svg
                  className='h-5 w-5'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
            </nav>
          </div>

          <div className='mr-4'>
            <p className='text-sm text-gray-700'>
              Showing
              <span className='font-medium'> 1 </span>
              to
              <span className='font-medium'> 10 </span>
              of
              <span className='font-medium'> 97 </span>
              results
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
