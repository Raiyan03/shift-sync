// "use client";
// import React, { useState, useEffect } from "react";
// import QRCode from "qrcode.react";

// export default function QRCodeGen() {
//   const [uniqueId, setUniqueId] = useState("");

//   useEffect(() => {
//     const generateUniqueId = () => {
//       const id = `EMP-${Math.floor(Math.random() * 1000000)}`;
//       setUniqueId(id);
//     };
//     generateUniqueId();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center h-screen">
//       <h1 className="text-2xl mb-4">QR Code Generator</h1>
//       {uniqueId && (
//         <div className="flex flex-col items-center">
//           <QRCode value={uniqueId} size={256} />
//           <p className="mt-4">Unique ID: {uniqueId}</p>
//         </div>
//       )}
//     </div>
//   );
// }
