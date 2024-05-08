import Footer from '@/components/Footer';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="relative flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/background-image.png')" }}
    >
      {children}

      <Footer />
    </div>
  );
}
