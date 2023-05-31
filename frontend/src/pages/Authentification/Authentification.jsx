import './Authentification.css';

function Authentification() {
    return (
            <div>
              <h1 className = 'h1auth'>Bienvenue sur "Ma Filmothéque"</h1> 
                <form className="centered" action="/ma-page-de-traitement" method="post">
                    <h2 className = 'h2auth'>Veuillez vous identifier</h2>
                        <div className="group">
                            <input className = 'inputauth' id="email" type="text" required="required"/>
                            <label className = 'labelauth' htmlFor="email">Adresse mail</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className = 'inputauth' id="mdp" type="password" required="required"/>
                            <label className = 'labelauth' htmlFor="mdp">Mot de passe</label>
                            <div className="bar"></div>
                        </div>
                        <div className="divbutton">
                            <button className = 'button' type="submit"><span>S'identifier</span></button>
                        </div>
                        <a className = 'creation' href='/ccompte'>Me créer un compte</a> 
                    </form>
                </div> 
            


        );   
}

export default Authentification;