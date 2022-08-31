import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Dialog } from 'primereact/dialog';
import UserGroup from './UserGroup';
import { Button } from 'primereact/button';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import CustomDataTable from 'components/Datatables/CustomDataTable';
import addUserToGroup from 'adapters/addUserToGroup';
import { onUpdateUserReducer } from 'reducers/userReducer';
import updateUserRepository from 'repository/user/updateUserRepository';
import { Column } from 'primereact/column';
import { Link } from 'react-router-dom';
import removeUserFromGroupRepository from 'repository/group/removeUserFromGroupRepository';
import RedirectSmallButton from 'components/Buttons/RedirectSmallButton';
import PermissionType from './PermissionType';
import PermissionCheck from './PermissionCheck';

export default function ShowGroup() {
  const dispatch = useDispatch();
  const groups = useSelector((state) => state.groups.data);
  const users = useSelector((state) => state.users.data);
  const { id } = useParams();
  const [group, setGroup] = useState({});
  const [usersGroup, setUsersGroup] = useState([]);
  const [displayBasic, setDisplayBasic] = useState(false);

  useEffect(() => {
    const group = groups.filter((e) => e.name === id);
    const dUsers = users.filter((e) => e.groups.includes(id));
    if (group.length > 0) {
      setGroup(group[0]);
    }
    if (dUsers.length > 0) {
      setUsersGroup(dUsers);
    }
  }, [groups, id, users]);

  const filter = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    firstName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
    },
    lastName: {
      operator: FilterOperator.AND,
      constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
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

  const footer = () => (
    <Button label='Close' onClick={handlerSubmitUserGroup} />
  );

  const handlerSubmitUserGroup = () => {
    setDisplayBasic(false);
  };

  async function handlerAddUserToGroup(data) {
    var user = structuredClone(data);
    user.groups.push(id);
    setUsersGroup([...usersGroup, user]);
    dispatch(onUpdateUserReducer(user));
    await addUserToGroup(id, user.id).catch((e) => {
      console.log(e);
    });
    await updateUserRepository(user);
  }

  const firstColumn = (rowData) => {
    return (
      <React.Fragment>
        <Link to={'/admin/users/' + rowData.id}>
          <div className='truncate text-blue-400 hover:text-blue-800'>
            {rowData.id}
          </div>
        </Link>
      </React.Fragment>
    );
  };

  const removeUserFromGroup = (rowData) => {
    return (
      <React.Fragment>
        <button
          onClick={async () => {
            var user = structuredClone(rowData);
            const users = usersGroup.filter((e) => e.id !== user.id);
            setUsersGroup(users);
            const index = user.groups.indexOf(id);
            user.groups.splice(index, 1);
            //
            await removeUserFromGroupRepository(id, user.id);
            await updateUserRepository(user);
            dispatch(onUpdateUserReducer(user));
          }}
          className='p-2 text-red-700'
        >
          <i className='fa fa-minus' aria-hidden='true'></i>
        </button>
      </React.Fragment>
    );
  };

  return (
    <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg border-0 px-3'>
      <div className='rounded-t bg-white mb-0 px-4 py-5'>
        <div className='text-center flex '>
          <ArrowBackButton />
          <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
            {group.name}
          </h6>
        </div>
      </div>

      <Dialog
        header='Users'
        // footer={footer}
        visible={displayBasic}
        style={{ width: '100vw' }}
        modal
        position='top'
        draggable={false}
        onHide={() => setDisplayBasic(false)}
        footer={footer}
      >
        <UserGroup
          data={UserGroup}
          group={id}
          handlerAdd={(e) => handlerAddUserToGroup(e)}
        />
      </Dialog>

      <div className='flex-auto py-10 pt-0 mt-7'>
        <div className='w-full bg-white p-10'>
          <div className='relative w-full font-bold mb-2'>Permissions</div>

          <div className='flex flex-wrap'>
            <div className='w-full w-12/12 p-4 border-dashed border border-gray-300 rounded'>
              <div className='flex flex-wrap '>
                <div className='w-6/12 mt-3'>
                  <div className='font-medium'>User Operations</div>
                  <div className='w-12/12 flex flex-wrap my-3'>
                    <div className='w-3/12'>Groups</div>
                    <div className='w-9/12 flex flex-wrap'>
                      :
                      <PermissionCheck
                        checked={
                          group.name === 'Administrators' ||
                          group.name === 'Sales'
                            ? true
                            : false
                        }
                      >
                        Add
                      </PermissionCheck>
                      <PermissionCheck
                        checked={
                          group.name === 'Administrators' ||
                          group.name === 'Sales'
                            ? true
                            : false
                        }
                      >
                        Remove
                      </PermissionCheck>
                    </div>
                  </div>

                  <PermissionType label='Users'>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Read
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Create
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Update
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Delete
                    </PermissionCheck>
                  </PermissionType>
                </div>
                <div className='w-6/12 mt-3'>
                  <div className='font-medium'>Ticket Operations</div>
                  <PermissionType label='Verify Ticket'>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales' ||
                        group.name === 'Supports'
                          ? true
                          : false
                      }
                    >
                      Read
                    </PermissionCheck>
                  </PermissionType>
                  <PermissionType label='Close Ticket'>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales' ||
                        group.name === 'Supports'
                          ? true
                          : false
                      }
                    >
                      Create
                    </PermissionCheck>
                  </PermissionType>
                </div>
                <div className='w-6/12 mt-3'>
                  <div className='font-medium'>Coupon Operations</div>
                  <PermissionType label='Coupons'>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Read
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Create
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Update
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Delete
                    </PermissionCheck>
                  </PermissionType>
                  <PermissionType label='Packages'>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Read
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Create
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Update
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Delete
                    </PermissionCheck>
                  </PermissionType>
                  <PermissionType label='Generate Coupons'>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales' ||
                        group.name === 'Guests'
                          ? true
                          : false
                      }
                    >
                      Read
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales' ||
                        group.name === 'Guests'
                          ? true
                          : false
                      }
                    >
                      Create
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Update
                    </PermissionCheck>
                    <PermissionCheck
                      checked={
                        group.name === 'Administrators' ||
                        group.name === 'Sales'
                          ? true
                          : false
                      }
                    >
                      Delete
                    </PermissionCheck>
                  </PermissionType>
                </div>
                <div className='w-6/12 mt-3'>
                  <div className='font-medium'>Report </div>
                  <PermissionType label='Serial Coupons'>
                    <PermissionCheck checked={true}>Read</PermissionCheck>
                  </PermissionType>
                  <PermissionType label='Close Tickets '>
                    <PermissionCheck checked={true}>Read</PermissionCheck>
                  </PermissionType>
                  <PermissionType label='Generate Coupons '>
                    <PermissionCheck checked={true}>Read</PermissionCheck>
                  </PermissionType>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/*  */}
        <div className='w-full bg-white p-4 mt-3'>
          <div className='relative w-full mb-3 font-bold'>
            <RedirectSmallButton
              text='Add Users'
              onClick={() => {
                setDisplayBasic(true);
              }}
            />
          </div>
          <div className='w-full'>
            <CustomDataTable
              dataColumns={[
                {
                  header: 'Name',
                  field: 'name',
                  sortable: true,
                  filter: true,
                },
                {
                  header: 'Email',
                  field: 'email',
                  sortable: true,
                  filter: true,
                },
                {
                  header: 'Phone',
                  field: 'phone',
                  sortable: true,
                  filter: true,
                },
              ]}
              data={usersGroup}
              filter={filter}
              actions={true}
              showIndex={false}
              showHeader={false}
              //
              firstColum={
                <Column
                  header={''}
                  body={firstColumn}
                  exportable={false}
                  style={{ minWidth: '10%' }}
                />
              }
              lastColumn={
                <Column
                  header={''}
                  body={removeUserFromGroup}
                  exportable={false}
                  style={{ minWidth: '5rem' }}
                />
              }
            />
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}
