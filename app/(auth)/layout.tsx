import React from 'react';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className="bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: "url('/background-image.png')" }}
    >
      <main>{children}</main>

      <div className="bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
