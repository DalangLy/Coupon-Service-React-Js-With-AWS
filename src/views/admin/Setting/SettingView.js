import BreadCrumb from 'components/Navbars/Breadcrumb';
import React, { Component } from 'react';

import CustomTextInput from 'components/TextFields/CustomTextInput';
import RedirectSmallButton from 'components/Buttons/RedirectSmallButton';
import createSettingRepository from 'repository/settings/createSettingRepository';
import { connect } from 'react-redux';
import { updateAppSetting } from 'reducers/settingReducer';
import addSourceEmailRepository from 'repository/mails/addSourceMailRepository';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import { Messages } from 'primereact/messages';

class SettingView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      loading: '',
      progressSubmit: false,
      isEmail: true,
      sourceMail: '',
      logoUrl: '',
      generateCouponMailTemplate: {
        title: '',
        header1: '',
        header2: '',
        header3: '',
        footer: '',
      },
      closeTicketMailTemplate: {
        title: '',
        header1: '',
        header2: '',
        header3: '',
        footer: '',
      },
    };

    this.message = React.createRef(null);

    this.handlerSubmit = this.handlerSubmit.bind(this);
  }

  componentDidMount() {
    this.initProp();
  }

  componentWillReceiveProps() {
    this.initProp();
  }

  initProp = () => {
    if (this.props.settings.length > 0) {
      const settings = this.props.settings[0].body;
      if (settings !== undefined) {
        this.setState({
          sourceMail: settings.sourceMail,
          logoUrl: settings.logoUrl,
          generateCouponMailTemplate: settings.generateCouponMailTemplate,
          closeTicketMailTemplate: settings.closeTicketMailTemplate,
        });
      }
    }
  };

  handlerSubmit = async (event) => {
    event.preventDefault();
    this.setState({ progressSubmit: true });
    try {
      this.props.updateAppSetting(this.state.settings);

      await addSourceEmailRepository(this.state.sourceMail);
      const settings = {
        sourceMail: this.state.sourceMail,
        logoUrl: this.state.logoUrl,
        generateCouponMailTemplate: this.state.generateCouponMailTemplate,
        closeTicketMailTemplate: this.state.closeTicketMailTemplate,
      };

      await createSettingRepository('mail_setting', settings).catch((e) => {
        this.setState({ progressSubmit: false });
      });
      this.message.current.show({
        severity: 'success',
        detail: 'Save successfully',
      });
    } catch (e) {
      this.message.current.show({
        severity: 'error',
        detail: 'Opp something error',
      });
    }

    this.setState({ progressSubmit: false });
  };

  render() {
    return (
      <>
        <LoadingDialog visible={this.state.progressSubmit} />
        <div className='rounded-lg bg-white mb-0 p-4 mb-4'>
          <div className='flex flex-wrap'>
            <div className='lg:w-12/12 '>
              <BreadCrumb paths={['Settings']} />
            </div>
          </div>
        </div>

        <div className='rounded-lg m-min-90 bg-white p-4 min-h-full py-10'>
          <form onSubmit={this.handlerSubmit}>
            <div className='w-full '>
              <div className='float-left align-center px-3'>
                <h4 className='mb-5 font-bold text-left mt-3'>Mail Template</h4>
              </div>
              <div className=' text-right'>
                <RedirectSmallButton type='submit'>
                  Save Change
                </RedirectSmallButton>
              </div>
            </div>
            <div className='w-full mt-8'>
              <Messages ref={this.message}></Messages>
              <div className='flex flex-wrap mb-6'>
                <div className='lg:w-6/12 md:w-6/12 sm:w-11/12 xs:w-11/12 xs-w px-3'>
                  <CustomTextInput
                    type='email'
                    value={this.state.sourceMail}
                    label='Source Mail'
                    hint='The email address that is sending the email.'
                    onChange={(e) => {
                      this.setState({
                        sourceMail: e.target.value,
                      });
                    }}
                  />
                </div>
                <div className='lg:w-6/12 md:w-6/12 sm:w-11/12 xs-w px-3'>
                  <CustomTextInput
                    label='URL Logo'
                    value={this.state.logoUrl}
                    onChange={(e) =>
                      this.setState({
                        logoUrl: e.target.value,
                      })
                    }
                    // hint='The email address that is sending the email.'
                  />
                </div>
              </div>

              {/*  */}
              <div className='flex flex-wrap'>
                <div className='lg:w-6/12 md:w-6/12 sm:w-11/12 xs-w px-3'>
                  <h4 className='mb-3 font-bold'>Generate Coupon</h4>
                  <CustomTextInput
                    label='Subject'
                    value={this.state.generateCouponMailTemplate.title}
                    onChange={(e) =>
                      this.setState({
                        generateCouponMailTemplate: {
                          ...this.state.generateCouponMailTemplate,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                  <CustomTextInput
                    label='Heading 1'
                    value={this.state.generateCouponMailTemplate.header1}
                    onChange={(e) =>
                      this.setState({
                        generateCouponMailTemplate: {
                          ...this.state.generateCouponMailTemplate,
                          header1: e.target.value,
                        },
                      })
                    }
                  />
                  <CustomTextInput
                    label='Heading 2'
                    value={this.state.generateCouponMailTemplate.header2}
                    onChange={(e) =>
                      this.setState({
                        generateCouponMailTemplate: {
                          ...this.state.generateCouponMailTemplate,
                          header2: e.target.value,
                        },
                      })
                    }
                  />
                  <CustomTextInput
                    label='Heading 3'
                    value={this.state.generateCouponMailTemplate.header3}
                    onChange={(e) =>
                      this.setState({
                        generateCouponMailTemplate: {
                          ...this.state.generateCouponMailTemplate,
                          header3: e.target.value,
                        },
                      })
                    }
                  />
                  <CustomTextInput
                    label='Footer'
                    value={this.state.generateCouponMailTemplate.footer}
                    onChange={(e) =>
                      this.setState({
                        generateCouponMailTemplate: {
                          ...this.state.generateCouponMailTemplate,
                          footer: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className='lg:w-6/12 md:w-6/12 sm:w-12/12 sm:w-11/12 xs-w px-3'>
                  <h4 className='mb-3 font-bold'>Close Ticket</h4>
                  <CustomTextInput
                    label='Subject'
                    value={this.state.closeTicketMailTemplate.title}
                    onChange={(e) =>
                      this.setState({
                        closeTicketMailTemplate: {
                          ...this.state.closeTicketMailTemplate,
                          title: e.target.value,
                        },
                      })
                    }
                  />
                  <CustomTextInput
                    label='Heading 1'
                    value={this.state.closeTicketMailTemplate.header1}
                    onChange={(e) =>
                      this.setState({
                        closeTicketMailTemplate: {
                          ...this.state.closeTicketMailTemplate,
                          header1: e.target.value,
                        },
                      })
                    }
                  />
                  <CustomTextInput
                    label='Heading 2'
                    value={this.state.closeTicketMailTemplate.header2}
                    onChange={(e) =>
                      this.setState({
                        closeTicketMailTemplate: {
                          ...this.state.closeTicketMailTemplate,
                          header2: e.target.value,
                        },
                      })
                    }
                  />
                  <CustomTextInput
                    label='Heading 3'
                    value={this.state.closeTicketMailTemplate.header3}
                    onChange={(e) =>
                      this.setState({
                        closeTicketMailTemplate: {
                          ...this.state.closeTicketMailTemplate,
                          header3: e.target.value,
                        },
                      })
                    }
                  />
                  <CustomTextInput
                    label='Footer'
                    value={this.state.closeTicketMailTemplate.footer}
                    onChange={(e) =>
                      this.setState({
                        closeTicketMailTemplate: {
                          ...this.state.closeTicketMailTemplate,
                          footer: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const settings = state.setting.data;
  return {
    settings,
  };
}

const mapDispatchToProps = (dispatch, ownProp) => {
  return {
    updateAppSetting: (data) => dispatch(updateAppSetting(data)),
    dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SettingView);
