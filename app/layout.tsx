import type { Metadata } from 'next';
import './globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import ReduxProvider from '@/Redux/reduxProvider';

config.autoAddCss = false;

export const metadata: Metadata = {
  title: 'Movie website',
  description: 'A website to tream and download movies',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
