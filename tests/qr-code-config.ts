/* biome-ignore-all lint/suspicious/noConsole: Output */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Get the file path of the current module
const __filename = fileURLToPath(import.meta.url);

// Get the folder path of the current module
const __dirname = path.dirname(__filename).replace(/\\/g, '/');

const useSvg = false;
const extension = useSvg ? 'svg' : 'png';

export const targetPath = path.posix.join(__dirname, '.generated');
fs.mkdirSync(targetPath, { recursive: true });
export const fileName = `qr-code-01.${extension}`;
export const fileNamePath = path.posix.join(targetPath, fileName);

export const testData = 'I am a pony!';
