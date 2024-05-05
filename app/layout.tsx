import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
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
      <body className="bg-white dark:bg-[#1a1c29]">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>{children}</ReduxProvider>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
