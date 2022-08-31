import ArrowBackButton from 'components/Buttons/ArrowBackButton';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Messages } from 'primereact/messages';
import { onAddOneItem } from 'reducers/saleReducer';
import FormGenerateCoupon from './FormGenerateCoupon';
import createSaleRepository from 'repository/sale/createSaleRepository';
import LoadingDialog from 'components/Dialogs/LoadingDialog';
import getCurrentUserGroup from 'repository/group/getCurrentUserGroup';
import { useHistory } from 'react-router';

export default function CreateGenerateCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const messages = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const appSetting = useSelector((state) => state.setting.data);

  const handlerSubmit = async (event, data) => {
    try {
      const userGroup = await getCurrentUserGroup();

      if (userGroup.includes('Administrators')) {
        setIsLoading(false);
        messages.current.show({
          severity: 'error',
          detail: 'Group Administrator not allow',
          sticky: true,
        });
        return;
      }

      if (data.customer == null) {
        messages.current.show({
          severity: 'error',
          detail: 'Please select customer',
          sticky: true,
        });
      } else if (data.packageId === '' || data.packageId === undefined) {
        messages.current.show({
          severity: 'error',

          detail: 'Please select package',
          sticky: true,
        });
      } else {
        setIsLoading(true);
        let mail = appSetting.length > 0 ? appSetting[0].body : undefined;

        if (data?.groups?.includes('Administrators')) {
          messages.current.show({
            severity: 'error',
            detail: 'This Operation can be do only Sale',
            sticky: true,
          });
          setIsLoading(false);
          return;
        }

        await createSaleRepository(data, mail)
          .then((result) => {
            messages.current.show({
              severity: 'success',
              detail: 'Create Sale Successfully',
              life: 6000,
            });
            dispatch(onAddOneItem(result.data.getSaleCoupon));
            history.goBack();
          })
          .catch((err) => {
            let message = err;

            messages.current.show({
              severity: 'error',
              // summary: 'Success Message',
              detail: message,
              sticky: true,
            });
          });
      }

      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 rounded-lg  border-0 px-3'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex '>
            <ArrowBackButton />
            <h6 className='ml-3 text-blueGray-700 text-xl font-bold'>
              Create Generate Coupon
            </h6>
          </div>
        </div>
        <div className='flex-auto px-4 lg:px-10 py-10  mt-3 bg-white'>
          <div className='px-4'>
            <Messages ref={messages}></Messages>
          </div>

          <LoadingDialog visible={isLoading} />
          <FormGenerateCoupon handlerSubmit={handlerSubmit} />
        </div>
      </div>
    </>
  );
}
