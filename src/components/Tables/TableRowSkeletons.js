function TableRowSkeletons({ count = 4 }) {
  let items = [];

  for (let index = 0; index < count; index++) {
    items.push(
      <tr key={index}>
        <td colSpan={5} className='px-5 py-2 text-center'>
          <div className=' rounded-md w-full'>
            <div className='animate-pulse flex space-x-4'>
              <div className='flex-1 space-y-6 py-1'>
                <div className='space-y-3'>
                  <div className='h-6 bg-slate-200 rounded-full'></div>
                </div>
              </div>
            </div>
          </div>
        </td>
      </tr>
    );
  }

  return <>{items}</>;
}

export default TableRowSkeletons;
