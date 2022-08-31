import { Dropdown } from 'primereact/dropdown';
import React from 'react';

const PaginatorTemplate = {
  layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
  RowsPerPageDropdown: (options) => {
    const dropdownOptions = [
      { label: 5, value: 5 },
      { label: 10, value: 10 },
      { label: 20, value: 20 },
      { label: 30, value: 30 },
      { label: 40, value: 40 },
      { label: 50, value: 50 },
      { label: 60, value: 60 },
      { label: 70, value: 70 },
      { label: 100, value: 100 },
      { label: 200, value: 200 },
    ];

    return (
      <React.Fragment>
        <span
          className='mx-1'
          style={{ color: 'var(--text-color)', userSelect: 'none' }}
        >
          Items per page:
        </span>
        <Dropdown
          value={options.value}
          options={dropdownOptions}
          onChange={options.onChange}
        />
      </React.Fragment>
    );
  },
};

export default PaginatorTemplate;
