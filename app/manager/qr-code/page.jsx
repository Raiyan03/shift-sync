"use client";

import QrCodeComponent from './qr-code';

export default function qrPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-black-100 p-8">
      <div className="bg-green-400 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-white text-2xl font-bold mb-2">Scan the <span className="text-black">QR </span>code!</h1>
        <p className="text-gray-700 mb-4">to visit our site</p>
        {/*Used example.com for placeholder*/}
        <QrCodeComponent value="https://www.example.com/" />
      </div>
    </div>
  );
}
