import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Layout from './components/Layout/Layout';
import Layoutwo from './components/Layoutwo/Layoutwo'
import Counter from './pages/Counter/Counter';
import Profil from './pages/Profil/Profil';
import Admin from './pages/Admin/Admin';
import Authentification from './pages/Authentification/Authentification';
import Creercompte from './pages/Creercompte/Creercompte';
import Meslistes from './pages/MesListes/Meslistes';




function App({nav}) {
  return (
    nav ?
    <Layoutwo>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<Authentification />} />
          <Route path="ccompte" element={<Creercompte />} />
          <Route path="counter" element={<Counter />} />
          <Route path="au" element={<Counter />} />
          <Route path="profil" element={<Profil />} />
          <Route path="about" element={<About />} />
          <Route path="admin" element={<Admin />} />
          <Route path="mlistes" element={<Meslistes />} />
      </Routes>
    </Layoutwo>
    :
    <Layout>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="auth" element={<Authentification />} />
          <Route path="ccompte" element={<Creercompte />} />
          <Route path="counter" element={<Counter />} />
          <Route path="au" element={<Counter />} />
          <Route path="profil" element={<Profil />} />
          <Route path="about" element={<About />} />
          <Route path="admin" element={<Admin />} />
          <Route path="mlistes" element={<Meslistes />} />
      </Routes>
      </Layout>
          
  );
}

export default App;
