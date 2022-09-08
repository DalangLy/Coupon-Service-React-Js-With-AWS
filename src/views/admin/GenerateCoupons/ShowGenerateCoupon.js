import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import deleteSaleRepository from 'repository/sale/deleteSaleRepository';
import updateSaleRepository from 'repository/sale/updateSaleRepository';
import { onEdit } from 'reducers/saleReducer';
import shortid from 'shortid';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import resendMailRepository from 'repository/sale/resendMailGenerateCouponRepository';
import findSaleRepository from 'repository/sale/findSaleRepository';
import { GenerateCouponStatus } from 'config/constants';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import {QRCodeCanvas} from "qrcode.react";

export default function ShowGenerateCoupon() {
  const userType = useSelector((state) => state.auth.userType);
  const mailSettings = useSelector((state) => state.setting.data);
  const [sale, setSale] = useState(null);
  const [serials, setSerials] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  const dispatch = useDispatch();

  const [displayResponsive, setDisplayResponsive] = useState(false);
  const [selectedCouponCodeForGenerateQR, setSelectedCouponCodeForGenerateQR] = useState();

  useEffect(() => {
    findSaleRepository(id).then((saleCouponResponse) => {
      setSale(saleCouponResponse);
      if (saleCouponResponse.serialCoupons?.items?.length > 0) {
        const data = groupBySerial(saleCouponResponse.serialCoupons?.items);
        setSerials(data);
      }
    });
  }, []);

  const showCouponQRDialog = (couponCode) => {
    setDisplayResponsive(true)
    setSelectedCouponCodeForGenerateQR(couponCode)
  }

  const onHide = (name) => {
    setDisplayResponsive(false)
  }

  const groupBySerial = (data) => {
    const groupByCoupon = data.reduce((group, serialCoupons) => {
      const { coupon } = serialCoupons;
      group[coupon.name] = group[coupon.name] ?? [];
      group[coupon.name].push({
        code: serialCoupons?.code,
        expired: serialCoupons?.dateValidEnd,
        deletedAt: serialCoupons?.deletedAt,
      });
      return group;
    }, {});

    return Object.entries(groupByCoupon).map((value) => ({
      name: value[0],
      codes: value[1],
    }));
  };

  const handlerApproveRequest = async () => {
    setIsLoading(true);
    await updateSaleRepository(sale, mailSettings[0]?.body)
      .then((result) => {
        setSale(result);
        dispatch(onEdit(result));
        history.goBack();
      })
      .catch((err) => {});
    setIsLoading(false);
  };

  const handlerCancelRequest = async () => {
    if (!sale?.saleCouponApproverId) {
      setIsLoading(true);
      await deleteSaleRepository(sale)
        .then((result) => {
          dispatch(onEdit(result));
        })
        .catch((err) => {});
      setIsLoading(false);
    }
  };

  const handlerResendMail = async () => {
    if (userType?.includes('Sales') || userType?.includes('Administrators')) {
      setIsLoading(true);
      await resendMailRepository(sale, serials, mailSettings)
        .then((result) => {})
        .catch((err) => {});
      setIsLoading(false);
    }
  };

  async function copyCouponCodeToClipboard(couponCode) {
    await navigator.clipboard.writeText(couponCode);
  }

  const downloadGeneratedCouponQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById('qr-gen');
    const pngUrl = canvas
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `${Date.now()}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
      <LoadingDialog visible={isLoading} />
      <div className='h-full relative flex flex-col min-w-0 break-words w-full mb-6  rounded-lg px-3 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex float-left'>
            <ArrowBackButton />
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>Sale</h6>
          </div>
        </div>
        <div className='flex-auto mt-3'>
          {sale !== null && sale?.status === GenerateCouponStatus.PENDING ? (
            <div className='w-full bg-white p-8 mb-4'>
              <div className='flex flex-wrap'>
                <div className='w-6/12'>
                  <h4 className='font-medium text-orange-500'>
                    {sale?.status === GenerateCouponStatus.PENDING &&
                    userType.includes('Guests')
                      ? ' Your Request is pending.'
                      : null}

                    {sale?.status === GenerateCouponStatus.REJECTED &&
                    userType.includes('Guests')
                      ? 'The Request is rejected.'
                      : null}
                  </h4>
                </div>

                <div className='w-6/12 flex flex-row-reverse '>
                  {(sale?.status === GenerateCouponStatus.PENDING &&
                    userType.includes('Sales')) ||
                  userType.includes('Administrators') ? (
                    <>
                      <div
                        className='border border-blue-400 font-medium text-blue-500  px-4  rounded py-2 mr-2 hover:bg-blue-400 hover:text-white hover:cursor-pointer'
                        onClick={handlerApproveRequest}
                      >
                        Accept
                      </div>
                      <div
                        className='border border-red-400 font-medium text-red-400 px-4 mr-2 rounded py-2 hover:bg-red-400 hover:text-white  hover:cursor-pointer'
                        onClick={handlerCancelRequest}
                      >
                        Reject
                      </div>
                    </>
                  ) : null}
                  {userType.includes('Sales') &&
                  sale?.status === GenerateCouponStatus.APPROVED ? (
                    <div
                      className='border border-blue-400 font-medium text-blue-500  px-4  rounded py-2 mr-2 hover:bg-blue-400 hover:text-white hover:cursor-pointer'
                      onClick={handlerResendMail}
                    >
                      Resend Serial Codes
                      <i className='pi pi-envelope ml-2'></i>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}

          <div className='w-full flex flex-wrap p-8 bg-white'>
            <div className='w-6/12'>
              <div className='w-12/12 font-medium text-sm mb-3 uppercase text-gray-400'>
                Information Detail
              </div>
              <div className='flex flex-wrap'>
                <div className='w-4/12 '>Package</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.package?.name}
                </div>
                <div className='w-4/12 '>Total Serial Coupon</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.totalCouponSerialCodeAmount}
                </div>
                <div className='w-4/12 '>Total Remaining Serial Coupon</div>
                <div className='w-8/12 mb-1 font-medium'>
                  :{' '}
                  {sale?.totalCouponSerialCodeAmount -
                    sale?.totalCouponSerialCodeUsed}
                </div>
                <div className='w-4/12 '>Price</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : ${sale?.price?.toFixed(2)}
                </div>

                <div className='w-4/12 mb-1 '>Discount</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.discount?.toFixed(2)}
                </div>
                <div className='w-4/12 mb-1 '>Total</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : ${sale?.price?.toFixed(2)}
                </div>
                <div className='w-4/12 mb-1 '>Issue Date</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.createdAt?.split('T')[0]}
                </div>
                <div className='w-4/12 mb-1 '>Description</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.description}
                </div>
              </div>
            </div>

            <div className='w-6/12'>
              <div className='w-12/12 font-medium text-sm mb-3 uppercase text-gray-400'>
                Account Detail
              </div>
              <div className='flex flex-wrap'>
                <div className='w-4/12 '>Name</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.owner?.firstName + ' ' + sale?.owner?.lastName}
                </div>
                <div className='w-4/12 mb-1 '>Job Title</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.owner?.jobTitle}
                </div>
                <div className='w-4/12 mb-1 '>Phone</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.owner?.phone}
                </div>
                <div className='w-4/12 mb-1 '>Company</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.owner?.company}
                </div>
                <div className='w-4/12 mb-1 '>Company Address</div>
                <div className='w-8/12 mb-1 font-medium'>
                  : {sale?.owner?.companyAddress ?? '-'}
                </div>
              </div>
            </div>
            {sale?.saleCouponApproverId && !sale?.deletedAt ? (
              <div className='w-full flex flex-wrap p-4 border border-dashed mt-3'>
                {serials?.map((coupon) => {
                  return (
                    <div className='w-full' key={shortid()}>
                      <div className='font-medium mb-2'>
                        {coupon?.name}{' '}
                        <span className='ml-3 bg-sky-200 p-1 text-sm rounded'>
                          Expired : {coupon?.codes[0]?.expired?.split('T')[0]}
                        </span>
                      </div>
                      <div className='flex align-content-around flex-wrap'>

                        {coupon?.codes?.map(function (serial) {
                          return (
                            <div className='w-2/12 p-2' key={shortid()}>

                              <div className={`${serial.deletedAt ? 'bg-red-800 text-white' : ''} flex justify-between border rounded p-3`}>
                                <span className={`flex align-items-center justify-content-center`}>{serial.code}</span>

                                <span>
                                  <Tooltip target=".custom-coupon-icon" className="p-tooltip-text shadow-none"/>
                                  <i onClick={() => showCouponQRDialog(serial.code)} className="custom-coupon-icon pi pi-qrcode p-1 cursor-pointer mr-2" data-pr-tooltip="Show QR"></i>
                                  <i onClick={() => copyCouponCodeToClipboard(serial.code)} className="custom-coupon-icon pi pi-clone p-1 cursor-pointer ml-2" data-pr-tooltip="Copy Code"></i>
                                </span>

                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}
          </div>
        </div>
      </div>



      {/*Coupon QR Code Dialog*/}
      <Dialog header={`Coupon QR Code (${selectedCouponCodeForGenerateQR})`} visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{'960px': '75vw'}} style={{width: '25vw'}} >
        <div className='flex flex-col justify-content-center align-content-center'>

          <QRCodeCanvas className='flex align-items-center justify-content-center m-auto'
              id='qr-gen'
              value={selectedCouponCodeForGenerateQR}
              size={300}
              includeMargin={6}/>

          <Button onClick={downloadGeneratedCouponQRCode} className="google p-0 text-center flex align-items-center justify-content-center" aria-label="Download">
            <i className="pi pi-download px-2"></i>
            <span className="px-3">Click here to download</span>
          </Button>
        </div>
      </Dialog>

    </>
  );
}
