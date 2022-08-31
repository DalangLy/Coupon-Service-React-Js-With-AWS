import React, { Component, createRef } from 'react';

// components
import CircleLoadingIndicator from 'components/Loadings/CircleLoadingIndicator';
import BackButton from 'components/Buttons/BackButton';
import { connect } from 'react-redux';
import { Messages } from 'primereact/messages';
import CustomTextInput from 'components/TextFields/CustomTextInput';
import { MultiSelect } from 'primereact/multiselect';
import CustomTextAreaInput from 'components/TextFields/CustomTextAreaInput';
import findUserRepository from 'repository/user/findUserRepository';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      groups: '',
      jobTitle: '',
      company: '',
      companyAddress: '',
    };

    this.message = createRef(null);
    //  binding
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // mounted
  async componentDidMount() {
    const disable =
      this.props.disable === undefined || !this.props.disable ? false : true;
    this.setState({
      disable: disable,
    });

    // find item
    if (this.props.userId !== undefined) {
      let data = this.props.users.filter((e) => e.id === this.props.userId);

      if (data.length > 0) {
        data = data[0];
      } else {
        data = await findUserRepository(this.props.userId);
      }

      this.setState({
        id: data.id,
        createdAt: data.createdAt,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        password: data.password,
        cfPassword: data.cfPassword,
        jobTitle: data.jobTitle,
        company: data.company,
        companyAddress: data.companyAddress,
        groups: data.groups,
      });
    } else {
      if (this.props.initSelectGroup) {
        this.setState({
          groups: [this.props.initSelectGroup ?? ''],
        });
      }
    }
  }

  // Submit handler
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.handleSubmit(event, this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} autoComplete='off'>
        <div className='p-3'>
          <Messages ref={this.message} />
        </div>

        <div className='flex flex-wrap'>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative w-full mb-3'>
              <CustomTextInput
                label='First Name'
                value={this.state.firstName}
                onChange={(e) => this.setState({ firstName: e.target.value })}
              />
            </div>
          </div>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative w-full mb-3'>
              <CustomTextInput
                label='last Name'
                value={this.state.lastName}
                onChange={(e) => this.setState({ lastName: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className='flex flex-wrap'>
          <div className='w-full lg:w-12/12 px-4'>
            <div className='relative w-full mb-4'>
              <label
                className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                htmlFor='grid-password'
              >
                Groups
              </label>
              <MultiSelect
                display='chip'
                value={this.state.groups}
                options={this.props.groups}
                onChange={(e) => {
                  this.setState({
                    groups: e.value,
                  });
                }}
                className='w-full shadow border-0 bg-white focus:outline-none focus:ring transition-all duration-150'
                placeholder='Select Group'
              />
            </div>
          </div>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative w-full mb-4'>
              <CustomTextInput
                label='email'
                type='email'
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
          </div>
          <div className='w-full lg:w-6/12 px-4'>
            <div className='relative w-full mb-6'>
              <CustomTextInput
                label='phone number'
                type='number'
                value={this.state.phone}
                onChange={(e) => this.setState({ phone: e.target.value })}
              />
            </div>
          </div>
        </div>

        {!this.props.isEdit ? (
          <div className='flex flex-wrap'>
            <div className='w-full lg:w-6/12 px-4'>
              <div className='relative w-full mb-3'>
                <CustomTextInput
                  label='password'
                  type='password'
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
            </div>
            <div className='w-full lg:w-6/12 px-4'>
              <div className='relative w-full mb-3'>
                <CustomTextInput
                  label='confirm password'
                  type='password'
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {this.state.groups.includes('Guests') ? (
          <div className='flex flex-wrap mt-3'>
            <div className='w-full lg:w-6/12 px-4'>
              <div className='relative w-full mb-3'>
                <CustomTextInput
                  label='Job Title'
                  value={this.state.jobTitle}
                  onChange={(e) => this.setState({ jobTitle: e.target.value })}
                />
              </div>
            </div>
            <div className='w-full lg:w-6/12 px-4'>
              <div className='relative w-full mb-3'>
                <CustomTextInput
                  label='Company'
                  value={this.state.company}
                  onChange={(e) => this.setState({ company: e.target.value })}
                />
              </div>
            </div>
            <div className='w-full lg:w-12/12 px-4 mt-3'>
              <div className='relative w-full mb-3'>
                <CustomTextAreaInput
                  label='Address'
                  value={this.state.companyAddress}
                  onChange={(e) =>
                    this.setState({ companyAddress: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className='flex flex-row-reverse mt-12 '>
          <button
            className='bg-sky-600 text-white active:bg-sky-200 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150'
            type='submit'
          >
            {this.props.isLoading ? <CircleLoadingIndicator /> : <></>}
            {this.props.isEdit ? 'Update' : 'Create'}
          </button>
          <div className='mx-3'></div>
          <BackButton />
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  const groupReducer = state.groups.data;
  const userGroup = state.auth.userType;
  let initSelectGroup;
  let groups = [];

  if (userGroup?.includes('Supports')) {
    initSelectGroup = 'Guests';
    groups = [
      {
        label: 'Guests',
        value: 'Guests',
      },
      {
        label: 'Supports',
        value: 'Supports',
      },
    ];
  }

  if (userGroup?.includes('Finances')) {
    initSelectGroup = 'Finances';
    groups = [
      {
        label: 'Finances',
        value: 'Finances',
      },
    ];
  }

  if (userGroup?.includes('Sales')) {
    initSelectGroup = 'Guests';
    groups = [
      {
        label: 'Guests',
        value: 'Guests',
      },
      {
        label: 'Sales',
        value: 'Sales',
      },
    ];
  }

  if (userGroup?.includes('Administrators')) {
    groups = groupReducer.map((e) => {
      return {
        label: e.name,
        value: e.name,
      };
    });
  }

  const users = state.users.data;
  return { groups: groups, users: users, initSelectGroup };
}

export default connect(mapStateToProps)(UserForm);
