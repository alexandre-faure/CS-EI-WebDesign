import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie_User from '../entities/movie_user.js';
import axios from 'axios';

const router = express.Router();

async function getFilmsRecommandations(user_id, dates, genres, searchBar) {
  try {
    const response = await axios.get(`http://localhost:8000/recommandation/${user_id}/20`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails des films populaires`);
    return null;
  }
}

async function getFilmsPopulaires(dates, genres, searchBar) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a`);
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de la récupération des détails des films populaires`);
      return null;
    }
  }

async function getFilmsRecence(dates, genres, searchBar) {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=522d421671cf75c2cba341597d86403a&sort_by=release_date.desc`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails des films les plus récents.`);
    return null;
  }
}

async function getFilmsMieuxNotes(dates, genres, searchBar) {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=522d421671cf75c2cba341597d86403a&sort_by=vote_average.desc`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération des détails du film avec l'ID ${idFilm}:`, error);
    return null;
  }
}

router.get('/', async function (req, res) {
    const params = JSON.parse(req.query.settings);

    let request = null;

    // On récupère la bonne fonction pour fair l'appel à TMDB
    switch (params.sort){
      case 'recommandations':
        request = async (dates, genres, searchBar) => getFilmsRecommandations(params.user_id, dates, genres, searchBar);
        break;
      case 'best-note':
        request = getFilmsMieuxNotes;
        break;
      case 'popular':
        request = getFilmsPopulaires;
        break;
      case 'most-recent':
        request = getFilmsRecence;
        break;
      default:
        res.JSON("Erreur")
        break;
    }

    const movies = await request(params.filters.dates, params.filters.genres, params.filters.searchBar);
    if (movies) {
        appDataSource
        .getRepository(Movie_User)
        .findBy({movie_user_id_user: params.user_id})
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

            res.json({movies: complete_movies})
        })
        .catch((error) => {
            console.log(error);
        });
    };
  });

export default router;