'use client';

import React, { useEffect, useState } from 'react';
import SignUpNav from '@/app/_components/SignUpNav';
import { SessionProvider, useSession } from 'next-auth/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SessionProvider>
      <LayoutContent>{children}</LayoutContent>
    </SessionProvider>
  );
};

const LayoutContent: React.FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!session);
  }, [session]);

  return (
    <div className="bg-white">
      <SignUpNav isLoggedIn={isLoggedIn} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
