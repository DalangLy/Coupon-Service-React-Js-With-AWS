import BackButton from 'components/Buttons/BackButton';
import CustomTextInput from 'components/TextFields/CustomTextInput';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import CustomButton from 'components/Buttons/CustomButton';
import CustomTextAreaInput from 'components/TextFields/CustomTextAreaInput';
import findPackageRepository from 'repository/package/findPackageRepository';

class FormPackage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      price: '',
      quantity: '',
      discount: 0,
      total: 0,
      couponPackagesId: '',
      description: '',
      packageDiscounts: [],
      deletedPackageDiscounts: [],
    };

    this.calculateTotal = this.calculateTotal.bind(this);
    this.handlerRemoveDiscountItem = this.handlerRemoveDiscountItem.bind(this);
    this.handlerChangeDiscountCoupon =
      this.handlerChangeDiscountCoupon.bind(this);
    this.handlerChangeDiscountQuantity =
      this.handlerChangeDiscountQuantity.bind(this);
    this.handlerChangeDiscountPrice =
      this.handlerChangeDiscountPrice.bind(this);
    this.handlerChangeDiscountDiscount =
      this.handlerChangeDiscountDiscount.bind(this);
  }

  async componentDidMount() {
    if (this.props.id !== undefined && this.props.isEdit) {
      console.log('hello '+JSON.stringify(this.props))
      let data = this.props.packages.filter((e) => e.id === this.props.id);

      if (data.length > 0) {
        data = data[0];
      } else {
        data = await findPackageRepository(this.props.id);
      }
      const total = this.calculateTotal(
        data.price,
        data.quantity,
        data.discount
      );
      let packageDiscounts = [];
      if (data.couponDiscountPackage.items.length > 0) {
        packageDiscounts = data.couponDiscountPackage.items.map((e) => {
          return {
            id: e.id,
            couponId: e.couponDiscountPackageCouponId,
            quantity: e.quantity,
            price: e.price,
            discount: e.discount,
          };
        });
      }

      this.setState({
        id: data.id,
        couponPackagesId: data.coupons.id,
        name: data.name,
        price: data.price,
        quantity: data.quantity,
        discount: data.discount,
        total: total,
        description: data.description,
        packageDiscounts: packageDiscounts,
      });
    }
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

  handlerRemoveDiscountItem = (data) => {
    const deletedItem = this.state.packageDiscounts.filter(
      (filter) => filter.id === data.id
    );

    let items = [];
    for (const key in this.state.packageDiscounts) {
      if (this.state.packageDiscounts.indexOf(data) !== parseInt(key)) {
        items.push(this.state.packageDiscounts[key]);
      }
    }
    this.setState({
      packageDiscounts: items,
      deletedPackageDiscounts:
        deletedItem[0].id === ''
          ? [this.state.deletedPackageDiscounts]
          : [...this.state.deletedPackageDiscounts, deletedItem[0].id],
    });
  };

  handlerChangeDiscountCoupon = (e, index) => {
    const data = this.props.coupons.filter((filter) => filter.id === e.value);

    const discountItem = {
      ...this.state.packageDiscounts[index],
      couponId: data[0].id,
      quantity:
        this.state.packageDiscounts[index].quantity > 0
          ? this.state.packageDiscounts[index].quantity
          : 1,
      price: data[0].price,
      discount: 100,
    };

    let items = this.state.packageDiscounts;
    items[index] = discountItem;

    if (data.length > 0) {
      this.setState({
        packageDiscounts: items,
      });
    }
  };

  handlerChangeDiscountQuantity = (event, index) => {
    let items = this.state.packageDiscounts;
    items[index].quantity = event.target.value;
    this.setState({
      packageDiscounts: items,
    });
  };

  handlerChangeDiscountPrice = (event, index) => {
    let items = this.state.packageDiscounts;
    items[index].price = event.value;
    this.setState({
      packageDiscounts: items,
    });
  };

  handlerChangeDiscountDiscount = (event, index) => {
    let items = this.state.packageDiscounts;
    items[index].discount = event.value;
    this.setState({
      packageDiscounts: items,
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handlerSubmit}>
          <div className='flex flex-wrap'>
            <div className='w-full lg:w-6/12 px-4'>
              {/* <div className='relative w-full mb-3'> */}
              <CustomTextInput
                label='Name'
                value={this.state.name}
                placeholder='Name'
                onChange={(e) => this.setState({ name: e.target.value })}
              />
              {/* </div> */}
            </div>
            <div className='w-full lg:w-6/12 px-4'>
              <label
                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                htmlFor={`grid-coupon`}
              >
                Coupon
                <span className='text-red-600'>*</span>
              </label>
              <Dropdown
                value={this.state.couponPackagesId}
                options={this.props.couponsDataDropdown}
                onChange={(e) => {
                  const data = this.props.coupons.filter(
                    (filter) => filter.id === e.value
                  );

                  this.setState({
                    couponPackagesId: e.value,
                    price: data[0].price,
                    quantity: this.state.quantity > 0 ? this.state.quantity : 1,
                    description: data[0].description,
                  });
                }}
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
                      required
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
                      required
                      placeholder='quantity'
                      className='shadow'
                      value={this.state.quantity}
                      onChange={(e) => {
                        const total = this.calculateTotal(
                          this.state.price,
                          e.value,
                          this.state.discount
                        );
                        this.setState({ quantity: e.value, total });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-12/12 mt-2'>
              <div className='w-full flex flex-wrap'>
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
                      required
                      placeholder='0.00'
                      className='shadow'
                      value={this.state.discount}
                      onChange={(e) => {
                        const total = this.calculateTotal(
                          this.state.price,
                          this.state.quantity,
                          e.value
                        );
                        this.setState({ discount: e.value, total });
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
                      disabled
                      placeholder='0.00'
                      className='shadow'
                      value={this.state.total}
                    />
                    <span className='p-inputgroup-addon "border-2'>$</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full lg:w-12/12 px-4 mt-7'>
              <div className='lg:w-2/12 mb-2'>
                <div
                  className='text-left cursor-pointer text-sm uppercase font-medium  text-sky-500 border-sky-500 px-3 py-3   ease-linear transition-all duration-150'
                  onClick={() => {
                    this.setState({
                      packageDiscounts: [
                        ...this.state.packageDiscounts,
                        {
                          id: '',
                          couponId: '',
                          quantity: 0,
                          price: 0,
                          discount: 0,
                        },
                      ],
                    });
                  }}
                >
                  Add Free Coupon
              </div>
              </div>
              {this.state.packageDiscounts.length > 0 ? (
                <div className='relative w-full mb-3'>
                  <table className='w-full  rounded'>
                    <thead>
                      <tr>
                        <th className=' p-3 text-left'>Coupon</th>
                        <th className=' p-3 text-left' style={{ width: '15%' }}>
                          Quantity
                        </th>
                        <th className=' p-3 text-left' style={{ width: '20%' }}>
                          Price
                        </th>
                        <th className=' p-3 text-left' style={{ width: '20%' }}>
                          Discount
                        </th>
                        <th className=''></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.packageDiscounts.length > 0 ? (
                        this.state.packageDiscounts.map((e, index) => (
                          <tr key={index}>
                            <td className='p-3'>
                              <Dropdown
                                value={e.couponId}
                                options={this.props.couponsDataDropdown}
                                className='w-full shadow'
                                placeholder='Select a Coupon'
                                onChange={(event) =>
                                  this.handlerChangeDiscountCoupon(event, index)
                                }
                              />
                            </td>
                            <td className='p-3'>
                              <CustomTextInput
                                placeholder='quantity'
                                value={e.quantity}
                                onChange={(e) => {
                                  this.handlerChangeDiscountQuantity(e, index);
                                }}
                              />
                            </td>
                            <td className='p-3'>
                              <div className='p-inputgroup'>
                                <InputNumber
                                  required
                                  className='shadow'
                                  placeholder='Price'
                                  value={e.price}
                                  onChange={(e) => {
                                    this.handlerChangeDiscountPrice(e, index);
                                  }}
                                />
                                <span className='p-inputgroup-addon border-2'>
                                  $
                                </span>
                              </div>
                            </td>
                            <td className='p-3'>
                              <div className='p-inputgroup'>
                                <InputNumber
                                  required
                                  className='shadow'
                                  value={e.discount}
                                  placeholder='discount'
                                  onChange={(e) => {
                                    this.handlerChangeDiscountDiscount(
                                      e,
                                      index
                                    );
                                  }}
                                />
                                <span className='p-inputgroup-addon "border-2'>
                                  %
                                </span>
                              </div>
                            </td>
                            <td className='px-2'>
                              <span
                                className='hover:text-red-500 cursor-pointer'
                                onClick={() =>
                                  this.handlerRemoveDiscountItem(e)
                                }
                              >
                                <i
                                  className='fa fa-minus'
                                  aria-hidden='true'
                                ></i>
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </div>

            <div className='w-full lg:w-12/12 px-4 mt-4'>
              <div className='relative w-full mb-3'>
                <CustomTextAreaInput
                  label='Description'
                  value={this.state.description}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                />
              </div>
            </div>

            {/*  */}
          </div>

          <div className='flex flex-row-reverse mt-12 '>
            <CustomButton>
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
  const couponsDataDropdown = state.coupons.data.map((e) => {
    return { label: e.name, value: e.id };
  });

  const coupons = state.coupons.data;
  const packages = state.packages.data;
  return { coupons: coupons, packages, couponsDataDropdown };
}

export default connect(mapStateToProps)(FormPackage);
