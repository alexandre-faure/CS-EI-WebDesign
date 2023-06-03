import express from 'express';
import axios from 'axios';
import { appDataSource } from '../datasource.js';
import Movie_User from '../entities/movie_user.js';

const router = express.Router();
const nbMovies = 20;
const nbPages = 30;

// Récupération de nbMovies films selon une requête
async function getMovies(dates, genres, query, sort_by, nbMovies, nbPages) {
  const movies = [];
  // On récupère toutes les dates
  let releaseYears = [];
  dates.forEach((date) => {
    for (let i=0; i<10; i++){
      releaseYears.push(parseInt(date) + i)
    }
  })

  // Gestion des pages
  let page = 1;
  let total_pages = 2;

  while (page <= nbPages && page <= total_pages && movies.length < nbMovies) {
    try {
      const new_movies = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params:{
          api_key: '522d421671cf75c2cba341597d86403a',
          query: query,
          with_genres: genres.join(','),
          primary_release_year: releaseYears.join(','),
          sort_by: sort_by
      }
    });
      total_pages = new_movies.data.total_pages;

      // On ajoute les films
      new_movies.data.results.forEach((movie) => {
        movies.push(movie);
      })

    } catch (error) {
      console.log(error);
    }
    page++;
  }
  const movies_response = movies.slice(0, nbMovies);

  return movies_response;
}

async function getFilmsRecommandations(user_id, dates, genres, query) {
  try {
    const response = await axios.get(
      `http://localhost:8000/recommandation/${user_id}/${nbMovies}`,
      {
        params: {
          settings: JSON.stringify({
            dates: dates,
            genres: genres,
            searchBar: query,
          }),
        },
      }
    );
    return response.data.movies;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des détails des films populaires`
    );

    return null;
  }
}

async function getFilmsPopulaires(dates, genres, query) {
  try {
    const response = await getMovies(
      dates,
      genres,
      query,
      'popularity.desc',
      nbMovies,
      nbPages
    );
    return response;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des détails des films populaires`
    );

    return null;
  }
}

async function getFilmsRecence(dates, genres, query) {
  try {
    const response = await getMovies(
      dates,
      genres,
      query,
      'release_date.desc',
      nbMovies,
      nbPages
    );
    return response;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des détails des films les plus récents.`
    );

    return null;
  }
}

async function getFilmsMieuxNotes(dates, genres, query) {
  try {
    const response = await getMovies(
      dates,
      genres,
      query,
      'vote_average.desc',
      nbMovies,
      nbPages
    );
    return response;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des détails des films les mieux notés.`
    );

    return null;
  }
}

async function getFilmResearch(dates, genres, query) {
  try {
    const response = await getMovies(
      dates,
      genres,
      query,
      '',
      nbMovies,
      nbPages
    );
    return response;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des détails des films les mieux notés.`
    );

    return null;
  }
}

router.get('/', async function (req, res) {
  const params = JSON.parse(req.query.settings);

  let request = null;
    // On récupère la bonne fonction pour fair l'appel à TMDB
    switch (params.sort){
      case 'recommandations':
        request = async (dates, genres, query) => getFilmsRecommandations(params.user_id, dates, genres, query);
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
        case 'default':
          request = getFilmResearch;
          break;
      default:
        res.json({"erreur":"Erreur"})
        break;
    }

  const movies = await request(
    params.filters.dates,
    params.filters.genres,
    params.filters.searchBar
  );

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
            movies.forEach(movie => {
                if (movie.id in infosByMovie){
                    complete_movies.push({...movie, infos_user:infosByMovie[movie.id]})
                }
                else{
                    complete_movies.push({...movie, infos_user:{status:0,like:0}})
                }
            });

        res.json({ movies: complete_movies });
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

export default router;
