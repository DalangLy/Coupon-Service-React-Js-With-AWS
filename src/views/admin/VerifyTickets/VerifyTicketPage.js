import React, { useState, useRef } from 'react';

import CustomTextInput from 'components/TextFields/CustomTextInput';
import verifyTicketRepository from 'repository/coupons/verifyTicketRepository';
// import QrReader from 'react-qr-scanner';
import QrReader from 'react-qr-reader';
import { isMobile } from 'react-device-detect';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import { InputSwitch } from 'primereact/inputswitch';
import { Divider } from 'primereact/divider';
import { Messages } from 'primereact/messages';

export default function VerifyTicketPage() {
  const [code, setCode] = useState('');
  const [blocker, setBlocker] = useState(false);
  const [isOpenCamera, setIsOpenCamera] = useState(true);
  const [isEnableScan, setIsEnableScan] = useState(true);
  const messages = useRef('');

  const handlerSubmit = async function (event) {
    event.preventDefault();
    setBlocker(true);
    await verifyTicketRepository(code)
      .then((res) => {
        messages.current.show({
          sticky: true,
          severity: res.success ? 'success' : 'error',
          detail: res.message,
        });
      })
      .catch((e) => {
        console.log(e);
      });
    setBlocker(false);
  };

  const handleScan = async (data) => {
    if (data) {
      setBlocker(true);
      if (isEnableScan) {
        setIsEnableScan(false);
        await verifyTicketRepository(data)
          .then((res) => {
            setBlocker(false);
            messages.current.show({
              sticky: true,
              severity: res.success ? 'success' : 'error',
              detail: res.message,
            });
          })
          .catch((e) => {
            console.log(e);
          });
        setIsEnableScan(true);
      }
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <>
      <div className='flex flex-wrap mt-10'>
        {/*  Dialog */}
        <LoadingDialog visible={blocker} />
        {/* <Toast ref={toast} /> */}
        <div className='w-full px-0 p-2'>
          <div className='w-full xl:w-6/12 lg:w-12/12 sm:w-12/12 md:w-12/12 px-6 pb-8 rounded bg-white mx-auto shadow'>
            <h2 className='pt-10 px-4 text-lg font-bold uppercase '>
              Verify Ticket
            </h2>
            <Divider type='dashed' />
            <form onSubmit={handlerSubmit}>
              <div className='w-full lg:w-12/12  px-4 '>
                <div className='w-full'>
                  <Messages ref={messages}></Messages>
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
                            checked={isOpenCamera}
                            onChange={(e) => setIsOpenCamera(!isOpenCamera)}
                          />
                        </div>
                      </div>
                      <div className='w-full lg:w-12/12 md:w-12/12 sm:w-12/12 mx-auto'>
                        {isOpenCamera ? (
                          code === '' ? (
                            <QrReader
                              delay={100}
                              className='qr-code-scanner'
                              onError={handleError}
                              onScan={handleScan}
                              facingMode={isMobile ? 'environment' : 'user'}
                            />
                          ) : (
                            <></>
                          )
                        ) : (
                          <CustomTextInput
                            label='Code'
                            placeholder='Code'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  {isOpenCamera && code !== '' ? (
                    <div className='py-4 px-4 bg-sky-200 w-full rounded'>
                      <p className='float-left'>{code}</p>
                      <div
                        className='float-right text-blue-500 underline cursor-pointer'
                        onClick={() => setCode('')}
                      >
                        Scan Again
                      </div>
                    </div>
                  ) : null}
                  {!isOpenCamera || code !== '' ? (
                    <>
                      <div className='w-full lg:w-12/12 mt-4 text-right '>
                        <button
                          // onClick={() =>}
                          className='w-full bg-sky-600 mt-2 text-white active:bg-sky-200 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1  ease-linear transition-all duration-150'
                          onClick={handlerSubmit}
                        >
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
