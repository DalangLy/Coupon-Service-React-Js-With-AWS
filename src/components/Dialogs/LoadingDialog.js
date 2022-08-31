import { Dialog } from 'primereact/dialog';
import React from 'react';
import Lottie from 'lottie-react';
import loadingPage from '../../lotties/83491-loading.json';

export default function LoadingDialog({ visible, onClose }) {
  return (
    <Dialog
      header
      visible={visible}
      className='loading-spinner sm:w-1/2 md:w-1/2'
      footer
      onHide={onClose}
      closable={false}
    >
      <div className='mx-auto text-center'>
        {/* {View} */}
        <Lottie
          animationData={loadingPage}
          style={{
            height: 200,
          }}
          loop={true}
        />
      </div>
    </Dialog>
  );
}
