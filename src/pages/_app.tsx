// src/pages/_app.tsx

import '@/styles/globals.css';
import type { AppProps } from 'next/app';

// Import Swiper's core styles globally as it's a key part of the app's navigation
import 'swiper/css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}