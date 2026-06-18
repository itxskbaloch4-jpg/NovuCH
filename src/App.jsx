import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Webentwicklung from './pages/Webentwicklung.jsx';
import Referenzen from './pages/Referenzen.jsx';
import UeberNovu from './pages/UeberNovu.jsx';
import Kontakt from './pages/Kontakt.jsx';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/webentwicklung" element={<Webentwicklung />} />
        <Route path="/referenzen" element={<Referenzen />} />
        <Route path="/ueber-novu" element={<UeberNovu />} />
        <Route path="/kontakt" element={<Kontakt />} />
      </Routes>
    </Layout>
  );
}
