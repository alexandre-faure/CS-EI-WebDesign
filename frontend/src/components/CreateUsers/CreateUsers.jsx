import { useState } from 'react';
import axios from 'axios';
import './CreateUsers.css';
import bcrypt from 'bcryptjs';

function CreateUsers( { onSuccessfulUserCreation } ) {
  const [nbNewUsers, setNbNewUsers] = useState(0);

  const [userCreationError, setUserCreationError] = useState(null);
  const [userCreationSuccess, setUserCreationSuccess] = useState(null);


  function generateRandomString(length, maj) {
    const characters = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'];
    let result = '';
    const charactersLength = 26;
    
    for (let i = 0; i < length; i++) {
      result += characters[maj].charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }


  const displayCreationSuccessMessage = () => {
    setUserCreationSuccess('Nouveaux utilisateurs créés avec succès.');
    setTimeout(() => {
      setUserCreationSuccess(null);
    }, 3000);
  };


  const saveUser = (event) => {
    // This avoid default page reload behavior on form submit
    event.preventDefault();

    for (let i = 0; i<nbNewUsers; i++ ){
      setUserCreationError(null);
      setNbNewUsers(0);

      const salt = bcrypt.genSaltSync(10);

      axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/users/new`, {
        email: generateRandomString(8, 1) + "@" + generateRandomString(6, 1) + ".fr",
        firstname:generateRandomString(1, 0) + generateRandomString(6, 1),
        lastname:generateRandomString(8, 0),
        pseudo:generateRandomString(8, 0),
        date_of_birth:"01/01/2000",
        salt: salt,
        password:bcrypt.hashSync("password", salt)
      })
      .then(() => {
        displayCreationSuccessMessage();
        onSuccessfulUserCreation();
      })
      .catch((error) => {
        setUserCreationError('Une erreur est survenue pendant la création des utilisateurs.');
        console.error(error);
      });
    }
  };

  return (
    <div>
      {userCreationSuccess !== null && (
        <div className="user-creation-success">{userCreationSuccess}</div>
      )}
      {userCreationError !== null && (
        <div className="user-creation-error">{userCreationError}</div>
      )}
      <form className="add-user-form" onSubmit={saveUser}>
        <input
          className="add-user-input"
          required
          type="number"
          placeholder="5"
          value={nbNewUsers}
          onChange={(event) =>
            setNbNewUsers(event.target.value)
          }
        />
        <button type="submit">Créer les utilisateur.ice.s</button>
      </form>
    </div>
  );
}

export default CreateUsers;
