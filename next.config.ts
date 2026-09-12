import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import { WEBHOOK_HOST } from './src/config/envServer';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  allowedDevOrigins: [WEBHOOK_HOST],
};

export default withNextIntl(nextConfig);
