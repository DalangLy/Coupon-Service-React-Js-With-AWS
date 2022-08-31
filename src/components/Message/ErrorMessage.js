function ErrorMessage({ message, handleClose }) {
  return (
    <>
      {/*  */}
      {message !== '' ? (
        <div
          className='p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800'
          role='alert'
        >
          <span className='font-medium'> {message}</span>
          <span
            className='text-red-700 fa fa-times float-right pt-1 cursor-pointer'
            onClick={() => (handleClose ? handleClose() : {})}
          ></span>
        </div>
      ) : (
        <div></div>
      )}

      {/*  */}
    </>
  );
}

export default ErrorMessage;
