import CustomTextInput from 'components/TextFields/CustomTextInput';
import { Dropdown } from 'primereact/dropdown';
import React, { createRef } from 'react';
import { connect } from 'react-redux';
import QrReader from 'react-qr-reader';
import { InputSwitch } from 'primereact/inputswitch';
import { isMobile } from 'react-device-detect';
import { Messages } from 'primereact/messages';
//
import closeTicketRepository from 'repository/coupons/closeTicketRepository';
import verifyTicketRepository from 'repository/coupons/verifyTicketRepository';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import { Divider } from 'primereact/divider';
import getUserByGroupRepository from 'repository/user/getUserByGroupRepository';
import getCurrentUserGroup from 'repository/group/getCurrentUserGroup';

class CloseTicketPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      init: true,
      code: '',
      customer: '',
      description: '',
      isOpenCamera: true,
      blocker: false,
      customers: [],
      nextToken: null,
    };

    this.messages = createRef();

    // function
    this.handleScan = this.handleScan.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handlerSubmit = this.handlerSubmit.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleScan = this.handleScan.bind(this);
  }

  componentDidMount() {
    if (this.state.customers.length <= 0) {
      this.getUsers(10);
      this.setState({ init: false });
    }
  }

  getUsers = async (limit, nextToken = null) => {
    getUserByGroupRepository('Guests', limit, nextToken)
      .then((res) => {
        const users = res?.items?.map((user) => {
          return {
            ...user,
            name: user.firstName + ' ' + user.lastName,
          };
        });

        this.setState({
          customers: [...this.state.customers, ...users],
          nextToken: res?.nextToken,
        });
      })
      .catch((e) => {});
  };

  handlerOnLoadMore = () => {
    if (this.state.nextToken !== null) this.getUsers(20, this.state.nextToken);
  };

  handlerSubmit = async function (event) {
    event.preventDefault();
    this.setState({ blocker: true });
    if (this.state.code === '') {
      this.messages.current.show({
        sticky: true,
        severity: 'error',
        detail: 'Code is required',
      });
    } else if (this.state.customer === '') {
      this.messages.current.show({
        sticky: true,
        severity: 'error',
        detail: 'Customer is required',
      });
    } else if (this.state.description.current === '') {
      this.messages.current.show({
        sticky: true,
        severity: 'error',
        detail: 'Description is required',
      });
    } else {
      const userGroup = await getCurrentUserGroup();

      if (userGroup?.includes('Administrators')) {
        this.messages.current.show({
          sticky: false,
          severity: 'error',
          detail: 'Group Administrator access denied for this.',
        });
        this.setState({ blocker: false });
        return;
      }

      const isValid = await verifyTicketRepository(this.state.code);
      if (!isValid.success) {
        this.messages.current.show({
          sticky: true,
          severity: 'error',
          detail: isValid.message,
        });
      } else {
        let data = {
          customer: this.state.customer,
          code: this.state.code,
          description: this.state.description,
          serialCouponId: isValid.serialCouponId,
          saleId: isValid.saleId,
          couponId: isValid.couponId,
          resolver: this.props?.auth,
          generateCoupon: isValid.sale,
          mailTemplate: this.props?.mailTemplate,
        };
        await closeTicketRepository(data)
          .then((data) => {
            this.setState({ blocker: false });
            this.messages.current.show({
              sticky: true,
              severity: 'success',
              detail: 'Code apply successfully',
            });
          })
          .catch((e) => {
            this.setState({ blocker: false });
            console.log(e);
          });
      }
    }
    this.setState({ blocker: false });
  };

  handleScan = async (data) => {
    if (data) {
      this.setState({ code: data });
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  selectedCountryTemplate = (option, props) => {
    if (option) {
      return (
        <div className='country-item country-item-value'>
          <div>{option.name}</div>
        </div>
      );
    }

    return <span>{props.placeholder}</span>;
  };

  countryOptionTemplate = (option) => {
    return (
      <div className='country-item'>
        <div>{option.name}</div>
      </div>
    );
  };

  render() {
    return (
      <>
        <div className='flex flex-wrap mt-10'>
          {/*  Dialog */}
          <LoadingDialog visible={this.state.blocker} />
          {/* <Toast ref={toast} /> */}
          <div className='w-full px-0 p-2'>
            <div className='w-full xl:w-6/12 lg:w-12/12 sm:w-12/12 md:w-12/12 px-6 py-10 rounded bg-white mx-auto shadow'>
              <h2 className=' px-4 text-lg font-bold uppercase '>
                Close Ticket
              </h2>
              <Divider type='dashed' />
              <form onSubmit={this.handlerSubmit}>
                <div className='w-full lg:w-12/12  px-4 '>
                  <div className='w-full'>
                    <Messages ref={this.messages}></Messages>
                  </div>
                  <div className='flex flex-wrap'>
                    <div className='w-full lg:w-12/12 '>
                      <div className='flex flex-wrap'>
                        <div className='w-full lg:w-12/12 md:w-12/12 sm:w-12/12 '>
                          <div className='flex flex-nowrap'>
                            <h1 className='mr-3 uppercase font-bold mb-5'>
                              SCAN QR CODE
                            </h1>
                            <InputSwitch
                              checked={this.state.isOpenCamera}
                              onChange={(e) =>
                                this.setState({
                                  isOpenCamera: !this.state.isOpenCamera,
                                })
                              }
                            />
                          </div>
                        </div>
                        <div className='w-full lg:w-12/12 md:w-12/12 sm:w-12/12 mx-auto'>
                          {this.state.isOpenCamera ? (
                            this.state.code === '' ? (
                              <QrReader
                                delay={100}
                                className='qr-code-scanner'
                                onError={this.handleError}
                                onScan={this.handleScan}
                                facingMode={isMobile ? 'environment' : 'user'}
                              />
                            ) : (
                              <></>
                            )
                          ) : (
                            <CustomTextInput
                              label='Code'
                              placeholder='Code'
                              value={this.state.code}
                              onChange={(e) =>
                                this.setState({ code: e.target.value })
                              }
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {this.state.isOpenCamera && this.state.code !== '' ? (
                      <div className='py-4 px-4 bg-sky-200 w-full rounded'>
                        <p className='float-left'>{this.state.code}</p>
                        <div
                          className='float-right text-blue-500 underline cursor-pointer'
                          onClick={() => this.setState({ code: '' })}
                        >
                          Scan Again
                        </div>
                      </div>
                    ) : null}
                    {!this.state.isOpenCamera || this.state.code !== '' ? (
                      <>
                        <div className='w-full lg:w-12/12 mt-3 flex flex-wrap'>
                          <div className='w-11/12'>
                            <label
                              className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                              htmlFor={`grid-coupon`}
                            >
                              Customer
                              <span className='text-red-600'>*</span>
                            </label>
                            <Dropdown
                              value={this.state.customer}
                              options={this.state.customers}
                              onChange={(e) => {
                                this.setState({ customer: e.value });
                              }}
                              optionLabel='name'
                              filter
                              filterBy='name'
                              className='w-full shadow'
                              placeholder='Select a Customer'
                              valueTemplate={this.selectedCountryTemplate}
                              itemTemplate={this.countryOptionTemplate}
                            />
                          </div>
                          <div className='w-1/12 '>
                            <div className='h-full flex'>
                              <div
                                className='ml-1 mt-5 pi pi-refresh place-self-center mx-auto p-4 bg-blue-100 rounded hover:cursor-pointer hover:bg-blue-300'
                                onClick={this.handlerOnLoadMore}
                              ></div>
                            </div>
                          </div>
                        </div>

                        <div className='w-full lg:w-12/12  mt-4'>
                          <label
                            className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                            htmlFor={`grid-coupon`}
                          >
                            Note
                            <span className='text-red-600'>*</span>
                          </label>
                          <textarea
                            className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                            rows={10}
                            required
                            onChange={(e) => {
                              this.setState({ description: e.target.value });
                            }}
                          />
                        </div>
                        <div className='w-full lg:w-12/12 mt-4 text-right'>
                          <button className='w-full bg-sky-600 mt-2 text-white active:bg-sky-200 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150'>
                            Submit
                          </button>
                        </div>
                      </>
                    ) : null}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  const { auth, setting } = state;
  return { auth: auth.user, mailTemplate: setting?.data[0]?.body };
}

export default connect(mapStateToProps)(CloseTicketPage);
