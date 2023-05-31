import axios from 'axios';
import './UsersTable.css';

function UsersTable({ users, onSuccessfulUserDeletion }) {
  const deleteUser = (userId) => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`)
      .then(() => onSuccessfulUserDeletion());
  };

  return (
    <div>
      <table className="users-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Prénom</th>
            <th>Nom de Famille</th>
            <th>Date de Naissance</th>
            <th>Mot de passe</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_email}>
            <td>{user.user_email}</td>
            <td>{user.user_firstname}</td>
            <td>{user.user_lastname}</td>
            <td>{user.user_date_of_birth}</td>
            <td>{user.user_password}</td>
              <td>
                <button onClick={() => deleteUser(user.user_id)}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersTable;
