import React, { useState, useEffect } from 'react';
// components
import { useSelector } from 'react-redux';

import { FilterMatchMode, FilterOperator } from 'primereact/api';
import CustomDataTable from 'components/Datatables/CustomDataTable';

export default function UserGroup({ group, handlerSelect, handlerAdd }) {
  const users = useSelector((state) => state.users.data);
  const [data, setData] = useState([]);

  useEffect(() => {
    const userGroup = users.filter((e) => !e.groups.includes(group));
    setData(userGroup);
  }, [users, group]);

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

  return (
    <>
      <CustomDataTable
        dataColumns={[
          {
            header: 'First Name',
            field: 'firstName',
            sortable: true,
            filter: true,
          },
          {
            header: 'Last Name',
            field: 'lastName',
            sortable: true,
            filter: true,
          },
          { header: 'Email', field: 'email', sortable: true, filter: true },
          { header: 'Phone', field: 'phone', sortable: true, filter: true },
        ]}
        data={data}
        filter={filter}
        actions={true}
        showIndex={false}
        showHeader={false}
        addHandler={(user) => {
          const old = data.filter((e) => e.id !== user.id);
          setData(old);
          if (handlerAdd !== undefined) {
            handlerAdd(user);
          }
        }}
      />
    </>
  );
}
