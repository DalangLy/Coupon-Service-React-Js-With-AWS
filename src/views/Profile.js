import React, { createRef } from 'react';
import RedirectSmallButton from 'components/Buttons/RedirectSmallButton';
import BreadCrumb from 'components/Navbars/Breadcrumb';
import CustomTextInput from 'components/TextFields/CustomTextInput';
import { connect } from 'react-redux';
import resetUserPasswordRepository from 'repository/user/resetUserPasswordRepository';
import { Messages } from 'primereact/messages';
import updateUserRepository from 'repository/user/updateUserRepository';
import { authProfile } from 'reducers/authReducer';
import LoadingDialog from 'components/Dialogs/LoadingDialog';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        companyAddress: '',
      },
      password: '',
      confirmPassword: '',
      isLoading: false,
    };

    this.message = createRef(null);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.handlerChangePassword = this.handlerChangePassword.bind(this);
  }

  componentDidMount() {
    this.setState({
      user: {
        ...this.props.user,
      },
    });
  }

  componentWillReceiveProps() {
    this.setState({
      user: {
        ...this.props.user,
      },
    });
  }

  handlerSubmit = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    this.message.current.clear();
    const obj1 = JSON.stringify(this.props.user);
    const obj2 = JSON.stringify(this.state.user);
    if (obj1 !== obj2) {
      await updateUserRepository(this.state.user)
        .then((res) => {
          this.message.current.show([
            {
              severity: 'success',
              detail: 'Updated Successfully',
              sticky: true,
            },
          ]);
        })
        .catch((e) => {
          this.message.current.show([
            {
              severity: 'error',
              detail: 'Opp something error.',
              sticky: true,
            },
          ]);
        });
    }
    this.setState({ isLoading: false });
  };

  handlerChangePassword = async (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    if (this.state.password !== '') {
      if (this.state.password !== this.state.confirmPassword) {
        this.message.current.show([
          {
            icon: null,
            severity: 'error',
            detail: 'Password and Confirm Password are not match. ',
            sticky: true,
          },
        ]);
      } else {
        // reset password
        await resetUserPasswordRepository(
          this.state.user.id,
          this.state.password
        ).then((res) => {
          this.message.current.show([
            {
              severity: 'error',
              detail: 'Opp something error.',
              sticky: true,
            },
          ]);
        });
      }
    }
    this.setState({ isLoading: false });
  };

  render() {
    return (
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg px-4'>
        <div className='flex flex-wrap'>
          <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sn rounded-lg bg-blueGray-100 border-0'>
            <div className='rounded-t bg-white mb-0 px-6 py-6'>
              <div className='text-center flex justify-between'>
                <BreadCrumb paths={['Profile']} />
              </div>
            </div>
          </div>

          <LoadingDialog visible={this.state.isLoading} />
          <div className='w-full h-full  bg-white rounded'>
            <div className='px-8'>
              <Messages ref={this.message} />
            </div>
            <div className='flex flex-wrap p-8'>
              <div className='w-6/12 px-6 border-dashed border-r border-gray-300'>
                <div className='w-full lg:w-12/12  text-1xl font-bold uppercase'>
                  Edit Account Detail
                </div>
                <form onSubmit={this.handlerSubmit}>
                  <div className='w-full lg:w-12/12  mt-3'>
                    <CustomTextInput
                      label='First Name'
                      value={this.state.user.firstName}
                      onChange={(e) =>
                        this.setState({
                          user: {
                            ...this.state.user,
                            firstName: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className='w-full lg:w-12/12  mt-3'>
                    <CustomTextInput
                      label='Last Name'
                      value={this.state.user.lastName}
                      onChange={(e) =>
                        this.setState({
                          user: {
                            ...this.state.user,
                            lastName: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className='w-full lg:w-12/12  mt-3'>
                    <CustomTextInput
                      label='Email'
                      type='email'
                      disable={true}
                      value={this.state.user.email}
                    />
                  </div>
                  <div className='w-full lg:w-12/12  mt-3'>
                    <CustomTextInput
                      label='Contact Number'
                      value={this.state.user.phone}
                      onChange={(e) =>
                        this.setState({
                          user: { ...this.state.user, phone: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className='w-full lg:w-12/12  mt-3'>
                    <CustomTextInput
                      label='Company'
                      value={this.state.user.company}
                      onChange={(e) =>
                        this.setState({
                          user: { ...this.state.user, company: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className='w-full lg:w-12/12  mt-3'>
                    <CustomTextInput
                      type='text'
                      label='Address'
                      value={this.state.user.companyAddress}
                      onChange={(e) =>
                        this.setState({
                          user: {
                            ...this.state.user,
                            companyAddress: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className=' w-12/12 text-right'>
                    <RedirectSmallButton type='submit'>
                      Change Account Information
                    </RedirectSmallButton>
                  </div>
                </form>
              </div>
              <div className='w-6/12 px-6'>
                <div className='w-full lg:w-12/12 text-1xl font-bold uppercase '>
                  Password
                </div>
                <form onSubmit={this.handlerChangePassword}>
                  <div className='w-full lg:w-12/12  mt-3'>
                    <CustomTextInput
                      label='New Password'
                      type='password'
                      onChange={(e) =>
                        this.setState({
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className='w-full lg:w-12/12  mt-3'>
                    <CustomTextInput
                      label='Confirm Password'
                      type='password'
                      onChange={(e) =>
                        this.setState({
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className=' w-12/12 text-right'>
                    <RedirectSmallButton type='submit'>
                      Change Password
                    </RedirectSmallButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = state.auth.user;
  return { user };
}

const mapDispatchToProps = (dispatch) => {
  return {
    initProfile: (userId) => dispatch(authProfile(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
