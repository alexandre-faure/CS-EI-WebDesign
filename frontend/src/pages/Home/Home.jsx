import { useContext, useEffect, useReducer } from 'react';
import FilterSide from '../../components/FilterSide/FilterSide';
import MovieSide from '../../components/MovieSide/MovieSide';

import { HomeContext } from '../../contexts/HomeContext';
import { HomeDispatchContext } from '../../contexts/HomeContext';

import './Home.css';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import axios from 'axios';
import { faL } from '@fortawesome/free-solid-svg-icons';

const lalaland = {
  adult: false,
  backdrop_path: '/qJeU7KM4nT2C1WpOrwPcSDGFUWE.jpg',
  belongs_to_collection: null,
  budget: 30000000,
  genres: [
    {
      id: 35,
      name: 'Comedy',
    },
    {
      id: 18,
      name: 'Drama',
    },
    {
      id: 10749,
      name: 'Romance',
    },
    {
      id: 10402,
      name: 'Music',
    },
  ],
  homepage: 'http://www.lalaland.movie',
  id: 313369,
  imdb_id: 'tt3783958',
  original_language: 'en',
  original_title: 'La La Land',
  overview:
    'Mia, an aspiring actress, serves lattes to movie stars in between auditions and Sebastian, a jazz musician, scrapes by playing cocktail party gigs in dingy bars, but as success mounts they are faced with decisions that begin to fray the fragile fabric of their love affair, and the dreams they worked so hard to maintain in each other threaten to rip them apart.',
  popularity: 26.045,
  poster_path: '/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg',
  production_companies: [
    {
      id: 491,
      logo_path: '/5LvDUt3KmvRnXQ4NrdWJYHeuA8J.png',
      name: 'Summit Entertainment',
      origin_country: 'US',
    },
    {
      id: 33681,
      logo_path: '/dHx2nsV9AC7IBlKN2dk1FDImvOz.png',
      name: 'Black Label Media',
      origin_country: 'US',
    },
    {
      id: 10161,
      logo_path: null,
      name: 'Gilbert Films',
      origin_country: 'US',
    },
    {
      id: 53247,
      logo_path: null,
      name: 'Impostor Pictures',
      origin_country: 'US',
    },
    {
      id: 2527,
      logo_path: '/osO7TGmlRMistSQ5JZusPhbKUHk.png',
      name: 'Marc Platt Productions',
      origin_country: 'US',
    },
    {
      id: 1632,
      logo_path: '/cisLn1YAUuptXVBa0xjq7ST9cH0.png',
      name: 'Lionsgate',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2016-11-29',
  revenue: 447407695,
  runtime: 129,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: "Here's to the fools who dream.",
  title: 'La La Land',
  video: false,
  vote_average: 7.892,
  vote_count: 15270,
};

function reducer(state, action) {
  var newState;
  switch (action.type) {
    case 'initializeHome':
      newState = JSON.parse(JSON.stringify(state));

      return newState;
    case 'toggleGenre':
      newState = JSON.parse(JSON.stringify(state));
      if (newState.genres[action.payload.genreId]) {
        delete newState.genres[action.payload.genreId];
      } else {
        newState.genres[action.payload.genreId] = true;
      }

      return newState;
    case 'toggleDate':
      newState = JSON.parse(JSON.stringify(state));
      if (newState.dates[action.payload.dateId]) {
        delete newState.dates[action.payload.dateId];
      } else {
        newState.dates[action.payload.dateId] = true;
      }

      return newState;
    case 'openDetails':
      newState = JSON.parse(JSON.stringify(state));

      newState.movieDetailsIsOpen = true;
      newState.movieDetails = action.payload.movie;
      if ('infos_user' in newState.movieDetails) {
        newState.movieCustomDetails = newState.movieDetails.infos_user;
      } else {
        newState.movieCustomDetails = {
          status: 0,
          like: 0,
        };
      }

      return newState;
    case 'closeDetails':
      newState = JSON.parse(JSON.stringify(state));

      newState.movieDetailsIsOpen = false;

      return newState;
    case 'addSliders':
      newState = JSON.parse(JSON.stringify(state));
      newState.homeSliders = [];
      action.payload.sliders.forEach((data) => {
        const newSlider = {};
        Object.assign(newSlider, data.slider);
        Object.assign(newSlider, { movies: data.movies });
        newState.homeSliders.push(newSlider);
      });

      return newState;
    case 'searchUpdate':
      newState = JSON.parse(JSON.stringify(state));
      newState.searchBar = action.payload.searchBar;

      return newState;

    case 'displayUpdate':
      newState = JSON.parse(JSON.stringify(state));
      newState.activeDisplay = action.payload.id;

      return newState;

    case 'toggleToSee':
      newState = JSON.parse(JSON.stringify(state));
      switch (newState.movieCustomDetails.status) {
        case 0:
          newState.movieCustomDetails.status = 1;

          return newState;
        case 1:
          newState.movieCustomDetails.status = 0;

          return newState;
        case 2:
          newState.movieCustomDetails.status = 3;

          return newState;
        case 3:
          newState.movieCustomDetails.status = 2;

          return newState;

        default:
          newState.movieCustomDetails.status = 0;

          return newState;
      }

    case 'toggleSeen':
      newState = JSON.parse(JSON.stringify(state));
      switch (newState.movieCustomDetails.status) {
        case 0:
          newState.movieCustomDetails.status = 2;

          return newState;
        case 1:
          newState.movieCustomDetails.status = 3;

          return newState;
        case 2:
          newState.movieCustomDetails.status = 0;

          return newState;
        case 3:
          newState.movieCustomDetails.status = 1;

          return newState;

        default:
          newState.movieCustomDetails.status = 0;

          return newState;
      }
    case 'updateCategories':
      newState = JSON.parse(JSON.stringify(state));
      newState.categories = action.payload.categories;

      return newState;

    case 'updateVote':
      newState = JSON.parse(JSON.stringify(state));
      newState.movieCustomDetails.like = action.payload.vote;

      return newState;

    default:
      return state;
  }
}

async function generateFakeFilms(state, dispatch, sliders) {
  var fakeMovieSliders = [];
  var fakeMovies;
  for (const sliderIndex in sliders) {
    await axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=8dfc83eb3a6543459e88094f1d060cee`
      )
      .then((response) => {
        // Do something if call succeeded

        fakeMovies = response.data.results;
        fakeMovieSliders.push({
          slider: sliders[sliderIndex],
          movies: fakeMovies,
        });
      })
      .catch((error) => {
        // Do something if call failed
        console.log(error);
      });
  }
  dispatch({
    type: 'addSliders',
    payload: { sliders: fakeMovieSliders },
  });
}

async function initializeHome(user_id) {
  var userSettings;
  await axios
    .get()
    .then((response) => {
      userSettings = response.data.results;
    })
    .catch((e) => {
      console.log(error);
    });
}

function Home() {
  const [state, dispatch] = useReducer(reducer, {
    genres: {},
    categories: [],
    dateCategories: [
      { title: '1920-1930', id: '1920' },
      { title: '1930-1940', id: '1930' },
      { title: '1940-1950', id: '1940' },
      { title: '1950-1960', id: '1950' },
      { title: '1960-1970', id: '1960' },
      { title: '1970-1980', id: '1970' },
      { title: '1980-1990', id: '1980' },
      { title: '1990-2000', id: '1990' },
      { title: '2000-2010', id: '2000' },
      { title: '2010-2020', id: '2010' },
      { title: '2020-2030', id: '2020' },
    ],
    dates: {},
    movieDetailsIsOpen: false,
    movieDetails: lalaland,
    movieCustomDetails: { status: 0, like: 0 },
    homeSliders: [],
    searchBar: '',
    displayOptions: [
      { title: 'Par défaut', id: 'default' },
      { title: 'Recommandations', id: 'recommandations' },
      { title: 'Les mieux notés', id: 'best-note' },
      { title: 'Populaires', id: 'popular' },
      { title: 'Les plus récents', id: 'most-recent' },
    ],
    activeDisplay: 'default',
    user_id: 'test',
  });

  useEffect(() => {
    const sliders = [
      { title: 'Recommandations', slider_id: 'recommandations' },
      { title: 'Les mieux notés', slider_id: 'best-note' },
      { title: 'Populaires', slider_id: 'popular' },
      { title: 'Les plus récents', slider_id: 'most-recent' },
    ];
    axios
      .get('http://localhost:8000/categories')
      .then((res) => {
        dispatch({
          type: 'updateCategories',
          payload: { categories: res.data.categories },
        });
      })
      .catch((e) => {
        console.log(e);
      });
    generateFakeFilms(state, dispatch, sliders);
  }, []);

  return (
    <HomeContext.Provider value={state}>
      <HomeDispatchContext.Provider value={dispatch}>
        <MovieDetails state={state} dispatch={dispatch} />
        <div className="home-container">
          <FilterSide />
          <MovieSide />
        </div>
      </HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
}

export default Home;
