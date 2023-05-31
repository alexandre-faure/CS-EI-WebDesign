import './Creercompte.css';

function Creercompte() {
    return (
        <div>
              <h1 className = 'h1cc'>Bienvenue sur "Ma Filmothéque"</h1> 
                <form className="centered" action="/ma-page-de-traitement" method="post">
                    <h2 className = 'h2cc'>Créer votre compte</h2>
                        <div className="group">
                            <input className ='inputcc' id="email" type="text" required="required"/>
                            <label className = 'labelcc' htmlFor="email">Adresse mail</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="username" type="text" required="required"/>
                            <label className = 'labelcc' htmlFor="username">Pseudo</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="lastname" type="text" required="required"/>
                            <label className = 'labelcc' htmlFor="lastname">Nom</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="firstname" type="text" required="required"/>
                            <label className = 'labelcc' htmlFor="firstname">Prénom</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputccdate' id="date de naissance" type="date" required="required"/>
                            <label className = 'labelcc' htmlFor="date de naissance">Date de naissance</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="mdp" type="password" required="required"/>
                            <label className = 'labelcc' htmlFor="mdp">Mot de passe</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="confirmmdp" type="password" required="required"/>
                            <label className = 'labelcc' htmlFor="confirmmdp">Confirmer le mot de passe</label>
                            <div className="bar"></div>
                        </div>
                        <div className="divbuttoncc">
                            <button className = 'buttoncc' type="submit"><span>Créer mon compte</span></button>
                        </div>    
                    </form>
                </div> 
    );   
}
    
export default Creercompte;