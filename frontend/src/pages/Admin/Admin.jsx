import './Admin.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Admin() {
  const [users, setUsers] = useState([]);
  const [genres, setGenres] = useState([])

  // Charger les genres dans la BDD
  const loadGenres = () => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=522d421671cf75c2cba341597d86403a`)
      .then((response) => {
        // Do something if success
        setGenres(response.data.genres)
        console.log(response.data.genres)
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error)
      });
  };

  return (
    <div id="admin-container">
      <h1>Page administrateur.ice</h1>

      <div>
        <h2>Gérer les profils</h2>

      </div>

      <div>
        <h2>Gérer les catégories</h2>
        <button onClick={loadGenres}>Charger les genres</button>
      </div>
    </div>
  );
}

export default Admin;
