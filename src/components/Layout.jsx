import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import CustomCursor from './CustomCursor.jsx';

export default function Layout({ children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
