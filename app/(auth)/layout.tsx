import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div
      className="relative flex flex-col bg-cover bg-center"
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
