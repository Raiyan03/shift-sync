"use client";

import QrCodeComponent from './qr-code';
import QrGenerate from './qr-generate';

export default function qrPage() {
  return (
    <div className="justify-center items-center bg-black-100 p-8">
      {/* <div className="p-6 rounded-lg shadow-lg flex flex-col items-center border-4 border-black"> */}
        {/* <h1 className="text-black text-2xl font-bold mb-2">Scan the <span className="text-black-300">QR </span>code!</h1> */}
        {/* <p className="text-gray-700 mb-4">to visit our site</p> */}
        {/* Used example.com for placeholder */}
        {/* <QrCodeComponent value="https://www.example.com/" /> */}
      {/* </div> */}
      <div className="p-7 rounded-lg shadow-lg flex flex-col items-center border-4 border-black">
        <h1>Employee QR Validation</h1>
        <QrGenerate />
      </div>
    </div>
  );
}
