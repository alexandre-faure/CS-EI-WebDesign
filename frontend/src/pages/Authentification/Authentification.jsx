import './Authentification.css';
import { useState } from 'react';

function Authentification() {
    return (
            <div>
              <h1>Bienvenue sur "Ma Filmothéque"</h1> 
                <form class="centered" action="/ma-page-de-traitement" method="post">
                    <h2>Veuillez vous identifier</h2>
                        <div class="group">
                            <input id="email" type="text" required="required"/>
                            <label for="email">Adresse mail</label>
                            <div class="bar"></div>
                        </div>
                        <div class="group">
                            <input id="mdp" type="password" required="required"/>
                            <label for="mdp">Mot de passe</label>
                            <div class="bar"></div>
                        </div>
                        <div className="divbutton">
                            <button className = 'button' type="submit"><span>S'identifier</span></button>
                        </div>
                    </form>
                </div> 
            





    //    <div>
    //     
    //     <form className = 'Authentification-container' action="/ma-page-de-traitement" method="post">
            
    //         <h2>Veuillez vous identifier</h2>
    //         <div>
    //             <label htmlFor="email">Adresse e-mail :</label>
    //             <input type="email" id="email" name="e_mail"></input>
    //             <div class="bar"></div>
    //         </div>
    //         <div>
    //             <label htmlFor="mdp">Mot de passe&nbsp;:</label>
    //             <input type="text" id="mdp" name="mot_de_passe"></input>
    //             <div class="bar"></div>
    //         </div>
    //         
    //     </form>
    //     </div> 
        );   
}

export default Authentification;