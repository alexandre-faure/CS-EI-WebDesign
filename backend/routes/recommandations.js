import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie_User from '../entities/movie_user.js';
import axios from 'axios';
import { SubjectWithoutIdentifierError } from 'typeorm';

const router = express.Router();

async function getDetailsFilm(idFilm) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${idFilm}?api_key=522d421671cf75c2cba341597d86403a`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des détails du film avec l'ID ${idFilm}:`, error);
      return null;
    }
  }

async function getDetailsFilms(listeIdFilms, infos_user, dates, genres, searchBar, nbMovies) {
    const films = [];
    let i = 0;

    while (i < listeIdFilms.length && films.length < nbMovies){
      const idFilm = listeIdFilms[i];
      const movie = await getDetailsFilm(idFilm);
      
      if (movie) {
          // Vérifier la date
        if (dates.length == 0 | ("release_date" in movie && dates.includes(movie.release_date.slice(0,3) + "0"))){
          // Vérifier les genres
          if (genres.length == 0 | genres.filter(g => movie.genre_ids.includes(parseInt(g))).length == 1){
            // Vérifier la recherche
            const search_value = searchBar.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            const title_normalized = movie.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
            if (searchBar == "" | title_normalized.includes(search_value)){
              // Ajout des caractéristiques
              if (idFilm in infos_user){
                movie.infos_user = infos_user[idFilm];
              }
              else{
                movie.infos_user = {status:0, like:0};
              }
              films.push(movie);
            }
          }
        }
      }
      i++;
    }
    return films;
}

router.get('/:user_id/:nb', function (req, res) { // Renvoie tous les users
  const params = JSON.parse(req.query.settings);
  
  appDataSource
    .getRepository(Movie_User)
    .find({})
    .then(function (movie_user) {
        const id_user = req.params.user_id;
        const nb_user_sim = 10;
        // Récupérer les likes par utilisateur
        const infos_user = {}
        const dataPerUser = {};
        movie_user.forEach(row => {
        if (row.movie_user_like != 0){
            if (row.movie_user_id_user == id_user){
                infos_user[row.movie_user_id_movie] = {status:row.movie_user_status, like:row.movie_user_like}
            }
            if (row.movie_user_id_user in dataPerUser){
                dataPerUser[row.movie_user_id_user] = {...dataPerUser[row.movie_user_id_user], [row.movie_user_id_movie]:row.movie_user_like}
            }
            else{
                dataPerUser[row.movie_user_id_user] = {[row.movie_user_id_movie]:row.movie_user_like}
            }
      }
      });

      // Calculer la similitude entre l'utilisateur choisi et les autres
      const characteristics = {};
      if (!(id_user in dataPerUser)){
        res.json({movies:{}})
        return [];
      }
    const ratedMovies = dataPerUser[id_user];
    
    const moyX = Object.values(ratedMovies).reduce((acc, val) => acc + val, 0) / Object.keys(ratedMovies).length;
    characteristics[id_user] = {moy:moyX}
    delete dataPerUser[id_user];
    Object.keys(dataPerUser).forEach(function(key) {
        let commonMovies = Object.keys(dataPerUser[key]).filter(e => Object.keys(ratedMovies).includes(e));
        let moyY = Object.values(dataPerUser[key]).reduce((acc, val) => acc + val, 0) / Object.keys(dataPerUser[key]).length;
        characteristics[key] = {moy: moyY};
        let S = 0;
        let X = 0;
        let Y = 0;
        commonMovies.forEach(id_movie =>{
            S += (ratedMovies[id_movie] - moyX)*(dataPerUser[key][id_movie] - moyY);
            X += (ratedMovies[id_movie] - moyX)**2;
            Y += (dataPerUser[key][id_movie] - moyY)**2;
        })
        if (X==0 | Y==0){
            characteristics[key].sim = 0;
        }
        else{
            characteristics[key].sim = S / (X*Y)**0.5;
        }
    });

      // Calculer les recommandations
      const movies = {};
      movie_user.forEach(row => {
        if (row.movie_user_id_movie in movies){
            movies[row.movie_user_id_movie] = {...movies[row.movie_user_id_movie], [row.movie_user_id_user]:{like: row.movie_user_like, sim:characteristics[row.movie_user_id_user].sim}}
        }
        else{
            movies[row.movie_user_id_movie] = {[row.movie_user_id_user]:{like: row.movie_user_like, sim:characteristics[row.movie_user_id_user].sim}}
        }
      });

      // Suppresion des films déjà vus
      const movies_recommandations = Object.fromEntries(
        Object.entries(movies).filter(([key, _]) => (key in infos_user ? infos_user[key].status != 2 : true))
      );

    const movie_pertinence = {};

      // Tri des utilisateurs par pertinence et suppressions des utilisateurs en trop
      Object.keys(movies_recommandations).forEach(function(key) {
        let triUsers = Object.entries(movies_recommandations[key]).sort(([, valueA], [, valueB]) => valueB.sim - valueA.sim)
        triUsers = triUsers.filter(element => element[0] != req.params.user_id)
        triUsers = triUsers.slice(0,nb_user_sim);
        let pertinence = 0;
        let somme_sim = 0;
        triUsers.map(user => {
            pertinence += user[1].sim * (user[1].like - characteristics[user[0]].moy)
            somme_sim += Math.abs(user[1].sim);
        })
        movie_pertinence[key] = moyX + (somme_sim == 0 ? 0 : pertinence/somme_sim);
      })

      const list_id_sims = Object.entries(movie_pertinence).sort(([, valueA], [, valueB]) => valueB - valueA);
      const list_id = list_id_sims.map(([first_elem]) => first_elem);

      getDetailsFilms(list_id, infos_user, params.dates, params.genres, params.searchBar, req.params.nb)
        .then((response) => {
            res.json({movies: response});
        })
        .catch((error) => {
            console.log("Une erreur est survenue.")
            console.log(error)
        })
    })
    .catch(function(error){
        console.log(error)
    });
});

export default router;
