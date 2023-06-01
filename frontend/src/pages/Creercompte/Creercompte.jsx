import './Creercompte.css';
import { useState, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import axios from 'axios';

const DEFAULT_FORM_VALUES = {
    email: '',
    pseudo: '',
    firstname: '',
    lastname: '',
    date_of_birth: '',
    password: '',
    password2: '',
    salt: bcrypt.genSaltSync(10)
  };
  

function Creercompte() {
    const [formValues, setFormValues] = useState(DEFAULT_FORM_VALUES);
    const [userCreationState, setUserCreationState] = useState("");

    const saveUser = (event) => {
        // This avoid default page reload behavior on form submit
        setUserCreationState(null);
        event.preventDefault();

        if (formValues.password != formValues.password2){
            setUserCreationState('Veuillez saisir deux mots de passe identiques.')
            setFormValues({ ...formValues, password: '', password2: '' })
            console.log("Mots de passes différents.")
        }
        else{
            const newAccountValues = {...formValues, password: bcrypt.hashSync(formValues.password, formValues.salt) };
            delete newAccountValues["password2"];

            console.log(newAccountValues)

            axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/users/new`, newAccountValues)
            .then(() => {
                setFormValues(DEFAULT_FORM_VALUES);
                setUserCreationState('Votre compte a été créé avec succès.');
                window.location.href="/auth"
            })
            .catch((error) => {
                setUserCreationState('Une erreur est survenue.');
                console.error(error);
            });
        }
      };
    
    return (
        <div>
              <h1 className = 'h1cc'>Bienvenue sur "CineSuggest"</h1> 
                <form className="centered" onSubmit={saveUser}>
                    <h2 className = 'h2cc'>Créer votre compte</h2>
                        <div className="group">
                            <input className ='inputcc' id="email" type="text" required="required"
                            value={formValues.email}
                            onChange={(event) =>
                              setFormValues({ ...formValues, email: event.target.value })
                            }/>
                            <label className = 'labelcc' htmlFor="email">Adresse mail</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="username" type="text" required="required"
                            value={formValues.pseudo}
                            onChange={(event) =>
                              setFormValues({ ...formValues, pseudo: event.target.value })
                            }/>
                            <label className = 'labelcc' htmlFor="username">Pseudo</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="lastname" type="text" required="required"
                            value={formValues.lastname}
                            onChange={(event) =>
                              setFormValues({ ...formValues, lastname: event.target.value })
                            }/>
                            <label className = 'labelcc' htmlFor="lastname">Nom</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="firstname" type="text" required="required"
                            value={formValues.firstname}
                            onChange={(event) =>
                              setFormValues({ ...formValues, firstname: event.target.value })
                            }/>
                            <label className = 'labelcc' htmlFor="firstname">Prénom</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputccdate' id="date de naissance" type="date" required="required"
                            value={formValues.date_of_birth}
                            onChange={(event) =>
                              setFormValues({ ...formValues, date_of_birth: event.target.value })
                            }/>
                            <label className = 'labelcc' htmlFor="date de naissance">Date de naissance</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="mdp" type="password" required="required"
                            value={formValues.password}
                            onChange={(event) =>
                              setFormValues({ ...formValues, password: event.target.value })
                            }/>
                            <label className = 'labelcc' htmlFor="mdp">Mot de passe</label>
                            <div className="bar"></div>
                        </div>
                        <div className="group">
                            <input className ='inputcc' id="confirmmdp" type="password" required="required"
                            value={formValues.password2}
                            onChange={(event) =>
                              setFormValues({ ...formValues, password2: event.target.value })
                            }/>
                            <label className = 'labelcc' htmlFor="confirmmdp">Confirmer le mot de passe</label>
                            <div className="bar"></div>
                        </div>
                        <div className="divbuttoncc">
                            <button className = 'buttoncc' type="submit"><span>Créer mon compte</span></button>
                        </div>  
                    </form>
                    {userCreationState !== null && (<div>{userCreationState}</div>)}
                </div> 
    );   
}
    
export default Creercompte;