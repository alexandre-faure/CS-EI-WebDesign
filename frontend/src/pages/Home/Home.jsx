import { useReducer } from 'react';
import FilterSide from '../../components/FilterSide/FilterSide';
import MovieSide from '../../components/MovieSide/MovieSide';
import SearchBar from '../../components/SearchBar/SearchBar';

import { HomeContext } from '../../contexts/HomeContext';
import { HomeDispatchContext } from '../../contexts/HomeContext';

import './Home.css';

function reducer(state, action) {
  switch (action.type) {
    case 'toggleGenre':
      var newState = JSON.parse(JSON.stringify(state));
      if (newState.genres[action.payload.genreId]) {
        delete newState.genres[action.payload.genreId];
      } else {
        newState.genres[action.payload.genreId] = true;
      }

      return newState;

    default:
      return state;
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, {
    genres: {},
    highlightedMovie: {},
  });

  return (
    <HomeContext.Provider value={state}>
      <HomeDispatchContext.Provider value={dispatch}>
        <div className="home-container">
          <SearchBar />
          <FilterSide />
          <MovieSide />
        </div>
      </HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
}

export default Home;
