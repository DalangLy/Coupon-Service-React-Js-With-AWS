import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useParams } from 'react-router';
import ArrowBackButton from 'components/Buttons/ArrowBackButton';

export default function QRCodeView() {
  const { id } = useParams();

  const downloadQRCode = () => {
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
      <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sn rounded-lg bg-blueGray-100 border-0'>
        <div className='rounded-t bg-white mb-0 px-6 py-6'>
          <div className='text-center flex justify-between'>
            <ArrowBackButton></ArrowBackButton>
          </div>
        </div>
      </div>
      <div className='h-full w-full bg-white pt-20'>
        <QRCodeCanvas
          id='qr-gen'
          value={id}
          size={300}
          style={{ margin: 'auto' }}
          includeMargin={6}
        />
        <div
          className='text-center mt-10 text-lg text-blue-500 underline cursor-pointer'
          onClick={downloadQRCode}
        >
          Click here to download
        </div>
      </div>
    </>
  );
}
