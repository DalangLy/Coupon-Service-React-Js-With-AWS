import React, { useState, useRef, useEffect } from 'react';

// components

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onUpdateUserReducer } from 'reducers/userReducer';
import { ConfirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import BreadCrumb from 'components/Navbars/Breadcrumb';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import CustomDataTable from 'components/Datatables/CustomDataTable';
import { Column } from 'primereact/column';
import disableUserRepository from 'repository/user/disableUserRepository';
import { useHistory } from 'react-router-dom';
import RedirectSmallButton from 'components/Buttons/RedirectSmallButton';
import { Tag } from 'primereact/tag';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import { Dropdown } from 'primereact/dropdown';
import { onNextPageUser, fetchUsers } from 'reducers/userReducer';

export default function Users() {
  const history = useHistory();
  const users = useSelector((state) => state.users);
  const auth = useSelector((state) => state.auth);
  const groups = useSelector((state) => state.groups.data);
  const [visible, setVisible] = useState(false);
  const [loading, setIsLoading] = useState(false);
  const toast = useRef(null);
  const [delUser, setDeleteUser] = useState({});
  const dispatch = useDispatch();

  const filter = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    name: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    groups: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
    },
    email: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    phone: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    company: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
  };

  useEffect(() => {
    if (users.isLoading) dispatch(fetchUsers());
  }, []);

  function deleteUser(user) {
    setVisible(true);
    var data = structuredClone(user);
    setDeleteUser(data);
  }

  async function acceptDelete() {
    setIsLoading(true);
    const user = {
      ...delUser,
      deletedAt: delUser.deletedAt === null ? new Date().toISOString() : null,
    };
    dispatch(onUpdateUserReducer(user));
    setDeleteUser({});
    await disableUserRepository(user).then((res) => {
      toast.current.show({
        severity: res.success ? 'success' : 'error',
        detail: res.message !== undefined ? res.message : res.errors.message,
        life: 3000,
      });
    });

    setIsLoading(false);
  }

  const actionBodyTemplate = (rowData) => {
    const color = rowData.status === 'Enable' ? 'yellow' : 'blue';
    return (
      <React.Fragment>
        <button
          type='button'
          onClick={() => {
            history.push('/admin/users/reset-password/' + rowData.id);
          }}
          className={`text-sky-700 hover:text-white border border-sky-700 hover:bg-sky-800  focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-sky-500 dark:text-sky-500 dark:hover:text-white dark:hover:bg-sky-600 dark:focus:ring-sky-800`}
        >
          Reset Password
        </button>
        <button
          type='button'
          onClick={() => {
            deleteUser(rowData);
          }}
          className={`text-${color}-700 hover:text-white border border-${color}-700 hover:bg-${color}-800  focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-${color}-500 dark:text-${color}-500 dark:hover:text-white dark:hover:bg-${color}-600 dark:focus:ring-${color}-800`}
        >
          {rowData.status}
        </button>

        <button
          type='button'
          onClick={() => {
            history.push('/admin/users/edit/' + rowData.id);
          }}
          className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'
        >
          <i className='pi pi-pencil' aria-hidden='true'></i> Edit
        </button>
      </React.Fragment>
    );
  };

  const groupBodyTemplate = (rowData) => {
    if (rowData?.groups?.length === 1 && rowData?.groups?.includes('')) {
      return '';
    }

    return (
      <React.Fragment>
        {rowData?.groups?.map((e) => (
          <Tag key={e.toLowerCase()} className='mr-2 mb-2' value={e}></Tag>
        ))}
      </React.Fragment>
    );
  };

  const groupFilterTemplate = (options) => {
    return (
      <Dropdown
        value={options.value}
        options={groups}
        onChange={(e) => {
          options.filterCallback(e.value);
        }}
        placeholder='Select a Coupon'
        className='p-column-filter'
        optionLabel='name'
        optionValue='name'
      />
    );
  };

  const activeUserBodyTemplate = (data) => {
    return (
      <div
        className={`w-[4rem] ${
          data.deletedAt ? 'bg-red-400' : 'bg-green-400'
        } text-sm text-center rounded text-white`}
      >
        {data.deletedAt === null ? 'Active' : 'Inactive'}
      </div>
    );
  };

  const loadMoreData = () => {
    dispatch(onNextPageUser({}, users.nextToken));
  };

  return (
    <>
      <div className='flex flex-wrap px-3'>
        <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sn rounded-lg bg-blueGray-100 border-0'>
          <div className='rounded-t bg-white mb-0 px-6 py-6'>
            <div className='text-center flex justify-between'>
              <BreadCrumb paths={['Users']} />
              <Link to={'/admin/users/create'}>
                <RedirectSmallButton text='New User' />
              </Link>
            </div>
          </div>
        </div>

        <LoadingDialog visible={loading} />

        <ConfirmDialog
          visible={visible}
          onHide={() => setVisible(false)}
          message={`Are you sure you want to ${delUser.deletedAt === null ? 'disable' : 'enable'} ${delUser.name}?`}
          header={`${delUser.deletedAt === null ? 'Disable' : 'Enable'}`}
          icon={`${delUser.deletedAt === null ? 'pi pi-times-circle' : 'pi pi-lock-open'}`}
          acceptClassName='p-button-danger text-black'
          accept={() => {
            acceptDelete();
          }}
          reject={() => {}}
        />

        <Toast ref={toast} />
        <CustomDataTable
          data={users.data}
          loading={users.isLoading}
          filter={filter}
          nextToken={users.nextToken}
          onLoadData={loadMoreData}
          dataColumns={[
            {
              header: 'Name',
              field: 'name',
              sortable: true,
            },
            { header: 'Email', field: 'email', sortable: true },
            { header: 'Phone', field: 'phone', sortable: true },
          ]}
          moreColumns={[
            <Column
              key={'groups-users'}
              header={'Groups'}
              body={groupBodyTemplate}
              filter
              filterField='groups'
              sortField='groups'
              sortable
              filterElement={groupFilterTemplate}
              exportable={false}
              style={{
                minWidth: '16rem',
              }}
            ></Column>,
            <Column
              key={'active'}
              header={'Status'}
              body={activeUserBodyTemplate}
              sortable
              exportable={false}
              style={{
                minWidth: '10rem',
              }}
            ></Column>,
          ]}
          actionChild={
            <Column
              header={'Action'}
              body={actionBodyTemplate}
              exportable={false}
              style={{
                minWidth: '16rem',
              }}
              // style={{ minWidth: '19rem' }}
            ></Column>
          }
        />
      </div>
    </>
  );
}
