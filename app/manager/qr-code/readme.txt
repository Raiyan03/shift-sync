! Important !

Install qrcode.react:

npm install qrcode.react


Usage:

QRCodeSVG:

import ReactDOM from 'react-dom';
import {QRCodeSVG} from 'qrcode.react';

ReactDOM.render(
  <QRCodeSVG value="https://reactjs.org/" />,
  document.getElementById('mountNode')
);



QRCodeCanvas:


import ReactDOM from 'react-dom';
import {QRCodeCanvas} from 'qrcode.react';

ReactDOM.render(
  <QRCodeCanvas value="https://reactjs.org/" />,
  document.getElementById('mountNode')
);



References:

https://www.npmjs.com/package/qrcode.react