import React from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
// import { Button } from 'primereact/button';
import shortid from 'shortid';

// component
import DataTableHeader from './DataTableHeader';
import ShowButton from './ShowButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';

export default class CustomDataTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      first: 0,
      rows: 10,
      globalFilterValue2: '',
      selected: null,
      selectedAll: false,
      totalRecords: 0,
      dataSelected: [],
      filter: null,
      template2: {
        layout:
          'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
        RowsPerPageDropdown: (options) => {
          const dropdownOptions = [
            { label: 5, value: 5 },
            { label: 10, value: 10 },
            { label: 20, value: 20 },
            { label: 50, value: 50 },
          ];

          return (
            <React.Fragment>
              <span
                className='mx-1'
                style={{ color: 'var(--text-color)', userSelect: 'none' }}
              >
                Items per page:{' '}
              </span>
              <Dropdown
                value={options.value}
                options={dropdownOptions}
                onChange={options.onChange}
              />
            </React.Fragment>
          );
        },
        CurrentPageReport: (options) => {
          return (
            <span
              style={{
                color: 'var(--text-color)',
                userSelect: 'none',
                width: '120px',
                textAlign: 'center',
              }}
            >
              {options.first} - {options.last} of {options.totalRecords}
            </span>
          );
        },
      },
    };

    //
    this.onInitFilter = this.onInitFilter.bind(this);
    this.onGlobalFilterChange = this.onGlobalFilterChange.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.onCustomPage = this.onCustomPage.bind(this);
    this.onIndexTemplate = this.onIndexTemplate.bind(this);
    this.dateBodyTemplate = this.dateBodyTemplate.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.dateFilterTemplate = this.dateFilterTemplate.bind(this);
    this.actionBodyTemplate = this.actionBodyTemplate.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.onSelectAllChange = this.onSelectAllChange.bind(this);
    this.actionBodyAdd = this.actionBodyAdd.bind(this);
  }

  componentDidMount() {
    this.onInitFilter(this.props.filter);
  }

  onInitFilter = (dataFilter) => {
    this.setState({
      filters: dataFilter,
    });
  };

  onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...this.state.filters };
    _filters['global'].value = value;
    this.setState({ filters: _filters, globalFilterValue2: value });
  };

  clearFilters = () => {
    let _filters = { ...this.state.filters };
    _filters['global'].value = null;
    this.setState({ filters: this.props.filter, globalFilterValue2: '' });
  };

  onCustomPage = (event) => {
    this.setState({ first: event.first, rows: event.rows });
  };

  onIndexTemplate = (data, props) => {
    let index = parseInt(props.rowIndex + 1);
    return (
      <React.Fragment>
        <span>{index}</span>
      </React.Fragment>
    );
  };

  dateBodyTemplate = (rowData, data) => {
    return this.formatDate(new Date(rowData.createdAt));
  };

  dateFilterTemplate = (options) => {
    return (
      <Calendar
        value={options.value}
        onChange={(e) => options.filterCallback(e.value, options.index)}
        dateFormat='mm/dd/yy'
        placeholder='mm/dd/yyyy'
        mask='99/99/9999'
      />
    );
  };

  formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {this.props.handlerShow !== undefined ? (
          <ShowButton onClick={() => this.props.handlerShow(rowData)} />
        ) : (
          <></>
        )}
        {this.props.handlerEdit !== undefined ? (
          <EditButton onClick={() => this.props.handlerEdit(rowData)} />
        ) : (
          <></>
        )}
        {this.props.handlerDelete !== undefined ? (
          <DeleteButton
            text={this.props.deleteText}
            icon={this.props.deleteIcon}
            onClick={() => this.props.handlerDelete(rowData)}
          />
        ) : (
          <></>
        )}
      </React.Fragment>
    );
  };

  actionBodyAdd = (rowData) => {
    return (
      <React.Fragment>
        <button
          onClick={() => {
            this.props.addHandler(rowData);
          }}
        >
          <svg
            className='w-6 h-6 stroke-2 stroke-sky-500 hover:stroke-sky-900'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </button>
      </React.Fragment>
    );
  };

  onSelectionChange = (event) => {
    const value = event.value;
    this.setState({
      selected: value,
      selectAll: value.length === this.state.totalRecords,
    });
    if (this.props.handlerOnSelect !== undefined) {
      this.props.handlerOnSelect(value);
    }
  };

  onSelectAllChange = (event) => {
    const selectAll = event.checked;
    if (selectAll) {
      this.setState({ selectedAll: true, selected: this.props.data });
      if (this.props.handlerOnSelect !== undefined) {
        this.props.handlerOnSelect(this.props.data);
      }
    } else {
      this.setState({ selectedAll: false, selected: [] });
      if (this.props.handlerOnSelect !== undefined) {
        this.props.handlerOnSelect([]);
      }
    }
  };

  render() {
    return (
      <div className='w-full px-0 bg-white'>
        <div
          className={
            'relative flex flex-col min-w-0 break-words w-full mb-6 rounded px-4'
          }
        >
          <DataTable
            header={
              this.props.showHeader === undefined ?? this.props.showHeader ? (
                <DataTableHeader
                  globalFilter={this.state.globalFilterValue2}
                  onChange={(e) => {
                    this.onGlobalFilterChange(e);
                  }}
                  onClear={this.clearFilters}
                  onLoadData={this.props.onLoadData}
                  nextToken={this.props.nextToken}
                  onRefresh={this.props.onRefresh}
                />
              ) : null
            }
            value={this.props.data}
            paginator
            paginatorTemplate={this.state.template2}
            first={this.state.first}
            rows={this.state.rows}
            onPage={this.onCustomPage}
            paginatorClassName='justify-content-end'
            className='mt-6'
            // sortMode='multiple'
            loading={this.props.loading}
            responsiveLayout='scroll'
            filters={this.state.filters}
            filterDisplay='menu'
            globalFilterFields={this.props.columns}
            selection={this.state.selected}
            onSelectionChange={this.onSelectionChange}
            selectAll={this.state.selectedAll}
            onSelectAllChange={this.onSelectAllChange}
            emptyMessage='No data found.'
            stripedRows
            size={this.props?.size ?? 'small'}
            onFilter={
              this.props.onFilter !== undefined
                ? (data) => this.props.onFilter(data)
                : null
            }
          >
            <Column header='' field='' style={{ width: '2%' }} />

            {this.props.firstColum !== undefined ? this.props.firstColum : null}
            {/*  */}
            {this.props.addHandler !== undefined ? (
              <Column
                header={''}
                body={this.actionBodyAdd}
                exportable={false}
                style={{ minWidth: '10%' }}
              ></Column>
            ) : null}

            {this.props.enableSelect !== undefined ||
            this.props.enableSelect ? (
              <Column
                selectionMode='multiple'
                headerStyle={{ width: '3em' }}
              ></Column>
            ) : null}

            {/* display index */}
            {this.props.showIndex === undefined || this.props.showIndex ? (
              <Column
                header='No'
                field='Index'
                body={this.onIndexTemplate}
                style={{ width: '10%' }}
              />
            ) : null}

            {/* children */}
            {this.props.dataColumns !== undefined
              ? this.props.dataColumns.map((col) => {
                  const sortable =
                    col?.sortable === null || col.sortable === undefined
                      ? false
                      : col.sortable;
                  const filter =
                    col?.filter === null || col.filter === undefined
                      ? false
                      : col.filter;

                  if (col.dataType === 'date') {
                    return (
                      <Column
                        key={shortid.generate()}
                        header={col.header}
                        filterField={col.field}
                        dataType='date'
                        style={{ minWidth: '25%' }}
                        body={this.dateBodyTemplate}
                        filter={filter}
                        sortable={sortable}
                        filterElement={this.dateFilterTemplate}
                      />
                    );
                  } else if (col.dataType === 'numeric') {
                    return (
                      <Column
                        key={shortid.generate()}
                        header={col.header}
                        field={col.field}
                        // dataType='number'
                        dataType='numeric'
                        style={{ width: '25%' }}
                        filter={filter}
                        sortable={sortable}
                      />
                    );
                  } else {
                    return (
                      <Column
                        key={shortid.generate()}
                        header={col.header}
                        field={col.field}
                        style={{
                          width: col.width === undefined ? '25%' : col.width,
                        }}
                        filter={filter}
                        sortable={sortable}
                      />
                    );
                  }
                })
              : null}

            {this.props.moreColumns !== undefined
              ? this.props.moreColumns.map((e, index) => e)
              : null}

            {this.props.handlerShow !== undefined ||
            this.props.handlerEdit !== undefined ||
            this.props.handlerDelete !== undefined ? (
              <Column
                header={'Action'}
                body={this.actionBodyTemplate}
                exportable={false}
                style={{
                  minWidth:
                    this.props.actionWidth !== undefined
                      ? this.props.actionWidth
                      : '19rem',
                }}
                // style={{ minWidth: '19rem' }}
              ></Column>
            ) : null}

            {this.props.actionChild !== undefined
              ? this.props.actionChild
              : null}
            {this.props.lastColumn !== undefined ? this.props.lastColumn : null}
          </DataTable>
        </div>

        <br />
      </div>
    );
  }
}
