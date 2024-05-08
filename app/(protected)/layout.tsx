import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { config } from '@fortawesome/fontawesome-svg-core';
import ReduxProvider from '@/Redux/reduxProvider';
import Header from '@/components/Header';

config.autoAddCss = false;

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black/35">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {' '}
          <Header />
          <ReduxProvider>{children}</ReduxProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
