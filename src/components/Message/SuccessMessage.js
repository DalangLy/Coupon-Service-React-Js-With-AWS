function SuccessMessage({ message, handleClose }) {
  return (
    <>
      {/*  */}
      {message !== '' ? (
        <div
          className='p-4 mb-4 text-sm text-green-700  bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'
          role='alert'
        >
          <span className='font-medium'> {message}</span>
          <span
            className='text-green-700 fa fa-times float-right pt-1 cursor-pointer'
            onClick={() => handleClose()}
          ></span>
        </div>
      ) : (
        <div></div>
      )}

      {/*  */}
    </>
  );
}

export default SuccessMessage;
