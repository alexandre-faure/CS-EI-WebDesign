import './Admin.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import UsersTable from '../../components/UsersTable/UsersTable';
import { useFetchUsers } from './useFetchUsers';

function Admin() {
  const { users, usersLoadingError, fetchUsers } = useFetchUsers();

  return (
    <div id="admin-container">
      <h1>Page administrateur.ice</h1>

      <div>
        <h2>Gérer les utilisateur.ice.s</h2>
          <UsersTable users={users} onSuccessfulUserDeletion={fetchUsers} />
      </div>
    </div>
  );
}

export default Admin;
