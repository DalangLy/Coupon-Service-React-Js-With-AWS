import BackButton from 'components/Buttons/BackButton';
import CircleLoadingIndicator from 'components/Loadings/CircleLoadingIndicator';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import CustomButton from 'components/Buttons/CustomButton';
import { Auth } from 'aws-amplify';
import shortid from 'shortid';
import { generateSerialCoupon } from 'utils';
import getUserByGroupRepository from 'repository/user/getUserByGroupRepository';

class FormGenerateCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      customers: [],
      couponId: '',
      quantity: 1,
      price: 0,
      discount: 0,
      total: 0,
      description: '',
      validFrom: '',
      validEnd: '',
      packageId: '',
      serialCoupons: [],
      groups: [],
      customerNextToken: '',
    };

    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.handlerSelectPackage = this.handlerSelectPackage.bind(this);
    this.handlerUpdateCode = this.handlerUpdateCode.bind(this);
    this.onInitDataCustomerSelectBox =
      this.onInitDataCustomerSelectBox.bind(this);
    this.onSelectChangeCustomer = this.onSelectChangeCustomer.bind(this);
  }

  componentDidMount() {
    Auth.currentAuthenticatedUser().then((res) => {
      const group =
        res.signInUserSession?.accessToken?.payload['cognito:groups'];
      this.setState({
        groups: group,
        customer: group?.includes('Sales') ? null : this.props.user,
      });
    });
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    this.props.handlerSubmit(event, this.state);
  };

  calculateTotal = (price, quantity, discount) => {
    const subTotal = price * quantity;
    const total = subTotal - (subTotal * discount) / 100;
    return total;
  };

  handlerSelectPackage = (e) => {
    const data = this.props.packages.filter((filter) => filter.id === e.value);
    const serials = generateSerialCoupon(data[0]);
    this.setState({
      packageId: e.value,
      price: data[0].price * data[0].quantity,
      quantity: this.state.quantity > 0 ? this.state.quantity : 1,
      serialCoupons: serials,
    });
  };

  handlerUpdateCode = (event, data, index) => {
    const indexOfCoupon = this.state.serialCoupons.indexOf(data);
    let newSerialCoupons = this.state.serialCoupons;
    newSerialCoupons[indexOfCoupon]['codes'][index]['code'] =
      event.target.value;

    this.setState({ serialCoupons: newSerialCoupons });
  };

  selectCustomerTemplate = (option, props) => {
    if (option) {
      return (
        <div className=''>
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  customerOptionTemplate = (option) => {
    return (
      <div className=''>
        <div>{option.name}</div>
      </div>
    );
  };

  onInitDataCustomerSelectBox = async (event) => {
    if (this.state.customers.length === 0) {
      this.loadCustomers();
    }
  };

  loadCustomers = () => {
    getUserByGroupRepository('Guests', 20, this.state.nextToken).then((res) => {
      const data = res?.items?.map((e) => ({
        name: e.firstName + ' ' + e.lastName,
        ...e,
      }));

      this.setState((prevState) => ({
        customers: [...prevState.customers, ...data],
        customerNextToken: res.nextToken,
      }));
    });
  };

  onSelectChangeCustomer = (event) => {
    this.setState({ customer: event.value });
  };

  loadMoreCustomer = () => {
    if (this.state.nextToken && this.state.customer.length > 0) {
      this.loadCustomers();
    }
  };

  render() {
    return (
      <>
        <form onSubmit={this.handlerSubmit}>
          <div className='flex flex-wrap'>
            {this.state.groups.includes('Sales') ? (
              <div className='w-full lg:w-6/12 px-4'>
                <label
                  className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                  htmlFor={`grid-coupon`}
                >
                  Customer
                  <span className='text-red-600'>*</span>
                </label>
                <div className='flex flex-wrap'>
                  <div className='w-11/12 pr-3'>
                    <Dropdown
                      value={this.state.customer}
                      options={this.state.customers}
                      onFocus={this.onInitDataCustomerSelectBox}
                      onChange={this.onSelectChangeCustomer}
                      optionLabel='name'
                      filter
                      filterBy='name'
                      placeholder='Select a Customer'
                      className='w-full shadow '
                      valueTemplate={this.selectCustomerTemplate}
                      itemTemplate={this.customerOptionTemplate}
                    />
                  </div>
                  <div className='w-1/12'>
                    <button
                      className={`text-sky-600 hover:bg-sky-600 border hover:text-white border-sky-400
           rounded-lg text-md px-5 py-2 text-center h-full ease-in duration-100 mr-0 mb-0 cursor-pointer`}
                      type='button'
                      onClick={this.loadMoreCustomer}
                    >
                      <i className='pi pi-refresh'></i>
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
            <div
              className={`w-full lg:w-${
                this.state.groups.includes('Sales') ? '6' : '12'
              }/12 px-4`}
            >
              <label
                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                htmlFor={`grid-coupon`}
              >
                Package
                <span className='text-red-600'>*</span>
              </label>
              <Dropdown
                required
                value={this.state.packageId}
                options={this.props.packageDataDropdown}
                onChange={this.handlerSelectPackage}
                className='w-full shadow'
                placeholder='Select a Coupon'
              />
            </div>

            <div className='w-full lg:w-12/12 mt-2'>
              <div className='w-full flex flex-wrap'>
                <div className='w-full lg:w-6/12 px-4'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor={`grid-coupon`}
                  >
                    Price
                    <span className='text-red-600'>*</span>
                  </label>
                  <div className='p-inputgroup'>
                    <InputNumber
                      disabled
                      placeholder='price'
                      className='shadow'
                      value={this.state.price}
                      onChange={(e) => {
                        const total = this.calculateTotal(
                          e.value,
                          this.state.quantity,
                          this.state.discount
                        );
                        this.setState({ price: e.value, total: total });
                      }}
                    />
                    <span className='p-inputgroup-addon "border-2'>$</span>
                  </div>
                </div>
                <div className='w-full lg:w-6/12 px-4'>
                  <label
                    className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                    htmlFor={`grid-coupon`}
                  >
                    Quantity
                    <span className='text-red-600'>*</span>
                  </label>
                  <div className='p-inputgroup'>
                    <InputNumber
                      placeholder='quantity'
                      className='shadow'
                      disabled
                      value={this.state.quantity}
                      onChange={(e) => {}}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-12/12 mt-2'>
              <div className='w-full flex flex-wrap'>
                {this.state.groups.includes('Sales') ? (
                  <>
                    <div className='w-full lg:w-6/12 px-4'>
                      <label
                        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                        htmlFor={`grid-coupon`}
                      >
                        Discount
                        <span className='text-red-600'>*</span>
                      </label>
                      <div className='p-inputgroup'>
                        <InputNumber
                          placeholder='discount'
                          className='shadow'
                          value={this.state.discount}
                          onChange={(e) => {
                            const total = this.calculateTotal(
                              this.state.price,
                              this.state.quantity,
                              e.value
                            );
                            this.setState({ discount: e.value, total: total });
                          }}
                        />
                        <span className='p-inputgroup-addon "border-2'>%</span>
                      </div>
                    </div>
                    <div className='w-full lg:w-6/12 px-4'>
                      <label
                        className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                        htmlFor={`grid-coupon`}
                      >
                        Total
                        <span className='text-red-600'>*</span>
                      </label>
                      <div className='p-inputgroup'>
                        <InputNumber
                          placeholder='0.00'
                          className='shadow'
                          disabled
                          value={this.state.total}
                        />
                        <span className='p-inputgroup-addon "border-2'>$</span>
                      </div>
                    </div>
                  </>
                ) : null}
              </div>
            </div>

            <div className='w-full lg:w-12/12 mt-2'>
              <div className='w-full  px-4'>
                <label
                  className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                  htmlFor={`grid-coupon`}
                >
                  Description
                  <span className='text-red-600'>*</span>
                </label>
                <textarea
                  className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  value={this.state.description}
                  onChange={(e) => {
                    this.setState({ description: e.target.value });
                  }}
                  placeholder='Description'
                />
              </div>
            </div>

            {this.state.groups.includes('Sales') ? (
              <div className='w-full lg:w-12/12 px-4 mt-2'>
                <div className='relative w-full mb-3'>
                  <h6 className='text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase'>
                    After Select Package Code Generates here
                  </h6>
                </div>
                {/*  */}
                <div className='relative  rounded w-full mb-3'>
                  <div className='flex flex-wrap'>
                    {this.state?.serialCoupons ? (
                      this.state.serialCoupons?.map((e) => {
                        return (
                          <div className='w-full ' key={shortid()}>
                            <div className='font-medium mb-2'>{e.name}</div>
                            <div className='flex flex-wrap'>
                              {e?.codes?.map((serial, index) => (
                                <div key={shortid()} className='w-4/12 pr-2'>
                                  <div className='relative w-full mb-3'>
                                    <input
                                      type='text'
                                      className='border-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                                      defaultValue={serial.code}
                                      onBlur={(event) =>
                                        this.handlerUpdateCode(event, e, index)
                                      }
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          <div className='flex flex-row-reverse mt-12 '>
            <CustomButton onClick={this.handlerSubmit}>
              {this.props.isLoading ? <CircleLoadingIndicator /> : <></>}
              {this.props.isEdit && this.props.isEdit !== undefined
                ? 'Update'
                : 'Create'}
            </CustomButton>
            <div className='mx-3'></div>
            <BackButton />
          </div>
        </form>
      </>
    );
  }
}

function mapStateToProps(state) {
  const packageDataDropdown = state.packages.data.map((e) => {
    return { label: e.name, value: e.id };
  });

  const coupons = state.coupons.data;
  const packages = state.packages.data;
  const user = JSON.parse(localStorage.getItem('user'));

  return {
    coupons: coupons,
    packages,
    packageDataDropdown,
    user,
  };
}

export default connect(mapStateToProps)(FormGenerateCoupon);
