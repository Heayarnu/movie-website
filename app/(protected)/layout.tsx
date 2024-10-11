import ReduxProvider from '@/Redux/reduxProvider';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';
import { db } from '@/lib/db';
import { config } from '@fortawesome/fontawesome-svg-core';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';

config.autoAddCss = false;

// Prisma client
const prisma = new PrismaClient();

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Access cookies server-side
  const cookieStore = cookies();
  const selectedProfileId = cookieStore.get('selectedProfileId')?.value;

  // Fetch the selected profile from Prisma
  const selectedProfile = selectedProfileId
    ? await db.profile.findUnique({
        where: { id: selectedProfileId }, // Ensure ID is parsed as an integer
      })
    : null;

  return (
    <body className="relative bg-white dark:bg-black/35">
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {/* Pass selectedProfile to the Header, if needed */}
        {selectedProfile && <Header profile={selectedProfile} />}

        {/* Provide Redux context */}
        <ReduxProvider>{children}</ReduxProvider>

        <Footer />
      </ThemeProvider>
    </body>
  );
}
