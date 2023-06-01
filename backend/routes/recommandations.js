import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie_User from '../entities/movie_user.js';
import axios from 'axios';

const router = express.Router();

router.get('/:user_id/:nb', function (req, res) { // Renvoie tous les users
  appDataSource
    .getRepository(Movie_User)
    .find({})
    .then(function (movie_user) {
        const id_user = req.params.user_id;
        const nb_user_sim = 10;
        // Récupérer les likes par utilisateur
      const dataPerUser = {};
      movie_user.forEach(row => {
        if (row.movie_user_like != 0){
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
      if (!id_user in dataPerUser){
        res.json({movies:{}})
      }
    const ratedMovies = dataPerUser[id_user];
    const moyX = Object.values(ratedMovies).reduce((acc, val) => acc + val, 0) / Object.keys(ratedMovies).length;
    characteristics[id_user] = {moy:moyX}
    delete dataPerUser[id_user];
    Object.keys(dataPerUser).forEach(function(key, index) {
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
        Object.entries(movies).filter(([_, value]) => !(id_user in value))
      );

    const movie_pertinence = {};

      // Tri des utilisateurs par pertinence et suppressions des utilisateurs en trop
      Object.keys(movies_recommandations).forEach(function(key, index) {
        let triUsers = Object.entries(movies_recommandations[key]).sort(([, valueA], [, valueB]) => valueB.sim - valueA.sim)
        triUsers =triUsers.slice(0,nb_user_sim);
        let pertinence = 0;
        let somme_sim = 0;
        triUsers.map(user => {
            console.log(pertinence)
            console.log(somme_sim)
            pertinence += user[1].sim * (user[1].like - characteristics[user[0]].moy)
            somme_sim += Math.abs(user[1].sim);
        })
        movie_pertinence[key] = moyX + pertinence/somme_sim;
      })

      axios
        .get()

      res.json({movie_user: movie_pertinence});
    })
    .catch(function(error){
        console.log(error)
    });
});

export default router;
