/* biome-ignore-all lint/suspicious/noConsole: Output */

import QRCode from 'qrcode';

import { fileNamePath, testData } from './qr-code-config';

// QRCode.toString(testData, {}, (err, url) => {
//   console.log(url);
// });

// @see https://www.npmjs.com/package/qrcode#qr-code-options
QRCode.toFile(fileNamePath, testData, (err) => {
  if (err) {
    // throw err;
    console.error(err);
  } else {
    console.log('QR code saved to a file:', fileNamePath);
  }
});
