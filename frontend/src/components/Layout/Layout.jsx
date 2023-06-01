import './Layout.css';
import Header from '../Header/Header';

const Layout = ({ children }) => {

  // Vérification que l'utilisateur est connecté
  let cookies = document.cookie.split("; ");
  const cookies_infos = {}
  cookies.forEach(cookie => {
    cookies_infos[cookie.split("=")[0]] = cookie.split("=")[1];
  })
  if ("session_active" in cookies_infos
  ? cookies_infos["session_active"] !== "true" : true){
    window.location.href = "/auth"
  }
  else{
    console.log(`Bonjour, utilisateur ${cookies_infos.user_id} !`)
  }

  return (
    <div className="Layout-container">
      <Header />
      <div className="Layout-content">{children}</div>
    </div>
  );
};

export default Layout;
