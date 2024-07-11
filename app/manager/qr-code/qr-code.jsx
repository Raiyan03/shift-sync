import React from 'react';
import QRCode from 'react-qr-code';
// basic qr code from readme.txt references
const QrCodeComponent = ({ value }) => {
  return (
    <div className="flex justify-center items-center">
      <QRCode value={value} size={256} />
    </div>
  );
};

export default QrCodeComponent;
