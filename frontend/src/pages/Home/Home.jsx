import { useReducer } from 'react';
import FilterSide from '../../components/FilterSide/FilterSide';
import MovieSide from '../../components/MovieSide/MovieSide';
import SearchBar from '../../components/SearchBar/SearchBar';

import { HomeContext } from '../../contexts/HomeContext';
import { HomeDispatchContext } from '../../contexts/HomeContext';

import './Home.css';
import MovieDetails from '../../components/MovieDetails/MovieDetails';

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
    default:
      return state;
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, {
    genres: {},
    movieDetailsIsOpen: false,
    movieDetails: {},
  });

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
