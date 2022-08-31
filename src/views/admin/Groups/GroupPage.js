import React from 'react';

import BreadCrumb from 'components/Navbars/Breadcrumb';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import CustomDataTable from 'components/Datatables/CustomDataTable';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function GroupPage() {
  const history = useHistory();

  const groups = useSelector((state) => state.groups.data);

  const filter = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    precedence: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    description: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    date: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
    },
  };

  return (
    <>
      <div className='flex flex-wrap px-3'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sn rounded-lg bg-blueGray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <BreadCrumb paths={['Groups']} />
            </div>
          </div>
        </div>

        <CustomDataTable
          dataColumns={[
            { header: 'Name', field: 'name', sortable: true, filter: true },
            // {
            //   header: 'Precedence',
            //   field: 'precedence',
            //   dataType: 'numeric',
            //   sortable: true,
            //   filter: true,
            // },
            { header: 'Description', field: 'description', width: '50rem' },
          ]}
          data={groups}
          filter={filter}
          // actions={true}
          handlerShow={(data) => {
            history.push('/admin/groups/' + data.name);
          }}
        />
      </div>
    </>
  );
}
