import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Counter from './pages/Counter/Counter';
import Profil from './pages/Profil/Profil';
import Admin from './pages/Admin/Admin';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="counter" element={<Counter />} />
        <Route path="profil" element={<Profil />} />
        <Route path="about" element={<About />} />
        <Route path="admin" element={<Admin />} />
      </Routes>
    </Layout>
  );
}

export default App;
