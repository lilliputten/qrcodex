import {
  RootLayout,
  generateMetadata,
  generateStaticParams,
  viewport,
} from './RootLayout';

// export const dynamic = 'force-static'; // NOTE: It prevents update of dynamic data, like the current user status

export { generateMetadata, generateStaticParams, viewport };
export default RootLayout;
