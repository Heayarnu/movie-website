import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { config } from '@fortawesome/fontawesome-svg-core';
import ReduxProvider from '@/Redux/reduxProvider';
import Header from '@/components/Header';
import GenreDropdown from '../../components/GenreDropdown';

config.autoAddCss = false;

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className="bg-white dark:bg-black/35 relative">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Header />
        {/* GenreDropdown */}
        <GenreDropdown />
        <ReduxProvider>{children}</ReduxProvider>
        <Footer />
      </ThemeProvider>
    </body>
  );
}
