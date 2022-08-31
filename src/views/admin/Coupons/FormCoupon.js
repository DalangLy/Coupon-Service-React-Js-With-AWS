import BackButton from 'components/Buttons/BackButton';
import CircleLoadingIndicator from 'components/Loadings/CircleLoadingIndicator';
import CustomTextInput from 'components/TextFields/CustomTextInput';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { InputNumber } from 'primereact/inputnumber';
import CustomButton from 'components/Buttons/CustomButton';
import CustomTextAreaInput from 'components/TextFields/CustomTextAreaInput';

class FormCoupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      shortcut: '',
      price: 0,
      periodNumber: 0,
      description: '',
      couponCreatorId: '',
    };

    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.id !== undefined && this.props.isEdit) {
      const data = this.props.coupons.filter((e) => e.id === this.props.id);
      if (data.length > 0) {
        this.setState({
          id: data[0].id,
          shortcut: data[0].shortcut,
          name: data[0].name,
          price: data[0].price,
          periodNumber: data[0].period,
          description: data[0].description,
        });
      }
    }
  }

  handlerSubmit = (event) => {
    event.preventDefault();
    this.props.handlerSubmit(event, this.state);
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
              <CustomTextInput
                label='Shortcut'
                value={this.state.shortcut}
                placeholder='Shortcut'
                onChange={(e) => this.setState({ shortcut: e.target.value })}
              />
            </div>
            <div className='w-full lg:w-6/12 px-4'>
              <div>
                <label
                  className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                  htmlFor={`grid-price`}
                >
                  Price <span className='text-red-600'>*</span>
                </label>
              </div>
              <div className='p-inputgroup'>
                <span className='shadow  p-inputgroup-addon bg-white'>$</span>
                <InputNumber
                  placeholder='Price'
                  className='border-0 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                  value={this.state.price}
                  onChange={(e) => {
                    this.setState({ price: e.value });
                  }}
                />
              </div>
            </div>
            <div className='w-full lg:w-6/12 px-4'>
              <CustomTextInput
                label='Period ( Months )'
                value={this.state.periodNumber}
                placeholder='Period'
                type='number'
                onChange={(e) => {
                  if (e.target.value >= 0) {
                    this.setState({ periodNumber: e.target.value });
                  }
                }}
              />
            </div>
            <div className='w-full lg:w-12/12 px-4 mt-2'>
              <div className='relative w-full mb-3'>
                <CustomTextAreaInput
                  label='Description'
                  rows={20}
                  onChange={(e) =>
                    this.setState({ description: e.target.value })
                  }
                  value={this.state.description}
                />
              </div>
            </div>
          </div>

          <div className='flex flex-row-reverse mt-12 '>
            <CustomButton>
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
  const coupons = state.coupons.data;
  return { coupons: coupons };
}

export default connect(mapStateToProps)(FormCoupon);
