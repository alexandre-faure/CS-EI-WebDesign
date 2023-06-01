import { useEffect, useReducer } from 'react';
import FilterSide from '../../components/FilterSide/FilterSide';
import MovieSide from '../../components/MovieSide/MovieSide';
import SearchBar from '../../components/SearchBar/SearchBar';

import { HomeContext } from '../../contexts/HomeContext';
import { HomeDispatchContext } from '../../contexts/HomeContext';

import './Home.css';
import MovieDetails from '../../components/MovieDetails/MovieDetails';
import axios from 'axios';

function reducer(state, action) {
  var newState;
  switch (action.type) {
    case 'toggleGenre':
      newState = JSON.parse(JSON.stringify(state));
      if (newState.genres[action.payload.genreId]) {
        delete newState.genres[action.payload.genreId];
      } else {
        newState.genres[action.payload.genreId] = true;
      }

      return newState;
    case 'openDetails':
      newState = JSON.parse(JSON.stringify(state));

      newState.movieDetailsIsOpen = true;

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

function Home() {
  const [state, dispatch] = useReducer(reducer, {
    genres: {},
    movieDetailsIsOpen: false,
    movieDetails: {},
    homeSliders: [],
  });

  useEffect(() => {
    const sliders = [
      { title: 'Toto', id: 'pour-vous' },
      { title: 'Populaire', id: 'populaire' },
    ];
    generateFakeFilms(state, dispatch, sliders);
  }, []);

  return (
    <HomeContext.Provider value={state}>
      <HomeDispatchContext.Provider value={dispatch}>
        <MovieDetails state={state} dispatch={dispatch} />
        <div
          className="home-container"
          style={{
            height: state.movieDetailsIsOpen ? 'calc(100vh - 50px)' : 'auto',
            overflow: state.movieDetailsIsOpen ? 'hidden' : 'visible',
          }}
        >
          <SearchBar />
          <FilterSide />
          <MovieSide />
        </div>
      </HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
}

export default Home;
