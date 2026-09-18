/* biome-ignore-all lint/suspicious/noConsole: Output */

import fs from 'node:fs';

import { Jimp } from 'jimp';
import jsQR from 'jsqr';

import { fileNamePath } from './qr-code-config';

// NOTE: The test file can be created with the `qr-code-generator-01.ts` script
console.log('Reading from a file:', fileNamePath);

const imageBuffer = fs.readFileSync(fileNamePath);
// console.log(imageBuffer);

async function decodeQRCode(
  imagePathOrBuffer: string | Buffer,
): Promise<string | null> {
  try {
    // 1. Read the image into memory using Jimp
    const image = await Jimp.read(imagePathOrBuffer);

    // 2. Extract raw RGBA pixel data
    const { data, width, height } = image.bitmap;
    const clampedArray = new Uint8ClampedArray(data);

    // 3. Pass raw pixel data to jsQR
    const qrCode = jsQR(clampedArray, width, height);

    if (qrCode) {
      return qrCode.data; // Successfully decoded text
    }

    return null; // No QR code found
  } catch (error) {
    console.error('Failed to decode QR code:', error);
    throw error;
  }
}

decodeQRCode(imageBuffer).then((data) => {
  // The data should be equal `testData` from `tests/qr-code-config.ts`
  console.log('Read data:', data);
});
