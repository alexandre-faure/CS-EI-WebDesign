import express from 'express';
import axios from 'axios';
import { appDataSource } from '../datasource.js';
import Movie_User from '../entities/movie_user.js';

const router = express.Router();
const nbMovies = 40;
const nbPages = 100;

// Récupération de nbMovies films selon une requête
async function getMovies(url, dates, genres, searchBar, nbMovies, nbPages) {
  const movies = [];
  let page = 1;
  let total_pages = 2; // Nombre de page maximum existant
  while (page <= nbPages && page <= total_pages && movies.length < nbMovies) {
    try {
      const new_movies = await axios.get(url + `&page=${page}`);

      total_pages = new_movies.data.total_pages;

      // On ajoute les films qui respectent les filtres
      new_movies.data.results.forEach((movie) => {
        // Vérifier la date
        if (
          (dates.length == 0) |
          ('release_date' in movie &&
            dates.includes(movie.release_date.slice(0, 3) + '0'))
        ) {
          // Vérifier les genres
          if (
            (genres.length == 0) |
            (genres.filter((g) => movie.genre_ids.includes(parseInt(g)))
              .length ==
              1)
          ) {
            // Vérifier la recherche
            const search_value = searchBar
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase();
            const title_normalized = movie.title
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase();
            if ((searchBar == '') | title_normalized.includes(search_value)) {
              movies.push(movie);
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
    page++;
  }
  const res = movies.slice(0, nbMovies);

  return res;
}

async function getFilmsRecommandations(user_id, dates, genres, searchBar) {
  console.log(user_id);
  console.log(dates);
  console.log(genres);
  console.log(searchBar);
  try {
    const response = await axios.get(
      `http://localhost:8000/recommandation/${user_id}/${nbMovies}`,
      {
        params: {
          settings: JSON.stringify({
            dates: dates,
            genres: genres,
            searchBar: searchBar,
          }),
        },
      }
    );

    return response;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des détails des films populaires`
    );

    return null;
  }
}

async function getFilmsPopulaires(dates, genres, searchBar) {
  try {
    const response = await getMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a`,
      dates,
      genres,
      searchBar,
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

async function getFilmsRecence(dates, genres, searchBar) {
  try {
    const response = await getMovies(
      `https://api.themoviedb.org/3/discover/movie?api_key=522d421671cf75c2cba341597d86403a&sort_by=release_date.desc`,
      dates,
      genres,
      searchBar,
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

async function getFilmsMieuxNotes(dates, genres, searchBar) {
  try {
    const response = await getMovies(
      `https://api.themoviedb.org/3/discover/movie?api_key=522d421671cf75c2cba341597d86403a&sort_by=vote_average.desc`,
      dates,
      genres,
      searchBar,
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
  switch (params.sort) {
    case 'recommandations':
      request = async (dates, genres, searchBar) =>
        getFilmsRecommandations(params.user_id, dates, genres, searchBar);
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
      res.JSON('Erreur');
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
      .findBy({ movie_user_id_user: params.user_id })
      .then(function (movie_user) {
        // Récupérations des caractéristiques propres à user
        const infosByMovie = {};
        movie_user.map((row) => {
          infosByMovie[row.movie_user_id_movie] = {
            status: row.movie_user_status,
            like: row.movie_user_like,
          };
        });
        // Ajout des caractéristiques propres à user pour chaque film
        const complete_movies = [];
        movies.forEach((movie) => {
          if (movie.id in infosByMovie) {
            complete_movies.push({
              ...movie,
              infos_user: infosByMovie[movie.id],
            });
          } else {
            complete_movies.push({
              ...movie,
              infos_user: { status: 0, like: 0 },
            });
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
