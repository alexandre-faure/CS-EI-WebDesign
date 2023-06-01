import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie_User from '../entities/movie_user.js';
import axios from 'axios';

const router = express.Router();

async function getFilmsRecence() {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=522d421671cf75c2cba341597d86403a&sort_by=release_date.desc`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des détails des films les plus récents.`);
      return null;
    }
  }

router.get('/:id_user', async function (req, res) {
    const movies = await getFilmsRecence();
    if (movies) {
        appDataSource
        .getRepository(Movie_User)
        .findBy({movie_user_id_user: req.params.id_user})
        .then(function (movie_user) {
            // Récupérations des caractéristiques propres à user
            let infosByMovie = {};
            movie_user.map((row) => {
                infosByMovie[row.movie_user_id_movie] = {status:row.movie_user_status, like:row.movie_user_like}
            })
            // Ajout des caractéristiques propres à user pour chaque film
            const complete_movies = [];
            movies.results.forEach(movie => {
                if (movie.id in infosByMovie){
                    complete_movies.push({...movie, infos_user:infos_user[movie.id]})
                }
                else{
                    complete_movies.push({...movie, infos_user:{status:0,like:0}})
                }
            });

            res.json({movie_user: complete_movies})
        })
        .catch((error) => {
            console.log(error);
        });
    };
  });

export default router;