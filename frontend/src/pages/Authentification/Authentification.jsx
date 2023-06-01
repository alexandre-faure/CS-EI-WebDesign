import './Authentification.css';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { useEffect, useState } from 'react';

const DEFAULT_FORM_VALUES = {
    user_email: '',
    user_password: ''
  };

function Authentification() {
    const [loginValues, setLoginValues] = useState(DEFAULT_FORM_VALUES);
    const [userCreationState, setUserCreationState] = useState(null);
    
    const login = (event) => {
      // This avoid default page reload behavior on form submit
      setUserCreationState(null);
      event.preventDefault();
      
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/login/login`, loginValues)
        .then((response) => {
            let user = response.data.user;
            if (user.length == 0){
              setLoginValues({...loginValues, user_password:''});
              setUserCreationState("Mot de passe ou adresse mail incorrect.")
            }
            else{
              user = user[0];
              bcrypt.compare(loginValues.user_password, user.user_password, (err, isMatch) => {
                if (err) {
                  console.error(err);
                }
                
                if (isMatch) {
                  let date = new Date(Date.now() + 3600*15).toUTCString;
                  document.cookie = `user_id=${user.user_id}; SameSite=lax; expires${date}; secure`;
                  document.cookie = `session_active=true; SameSite=lax; expires${date}; secure`;
                  window.location.href = "/"
                } else {
                  setLoginValues({...loginValues, user_password:''});
                  setUserCreationState("Mot de passe ou adresse mail incorrect.")
                }
              });
              
            }
        })
        .catch((error) => {
            setUserCreationState('Une erreur est survenue lors de la connexion.');
            console.error(error);
        });
      }
  

    return (
            <div>
              <h1 className = 'h1auth'>Bienvenue sur "Ma Filmothéque"</h1> 
                <form className="centered" onSubmit={login}>
                    <h2 className = 'h2auth'>Veuillez vous identifier</h2>
                        <div className="group">
                            <input className = 'inputauth' id="email" type="text" required="required"
                            value={loginValues.user_email}
                            onChange={(event) =>
                              setLoginValues({ ...loginValues, user_email: event.target.value })
                            }/>
                            <label className = 'labelauth' htmlFor="email">Adresse mail</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className = 'inputauth' id="mdp" type="password" required="required"
                            value={loginValues.user_password}
                            onChange={(event) =>
                              setLoginValues({ ...loginValues, user_password: event.target.value })
                            }/>
                            <label className = 'labelauth' htmlFor="mdp">Mot de passe</label>
                            <div className="bar"></div>
                        </div>
                        <div className="divbutton">
                            <button className = 'button' type="submit"><span>S'identifier</span></button>
                        </div>
                        <a className = 'creation' href='/ccompte'>Me créer un compte</a> 
                    </form>
                    <div>{userCreationState}</div>
                </div> 
            


        );   
}

export default Authentification;