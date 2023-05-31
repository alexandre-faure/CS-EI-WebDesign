import './FilterSide.css';
import { useEffect, useReducer, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import GenreCheckbox from '../GenreCheckbox/GenreCheckbox';
import { HomeContext, HomeDispatchContext } from '../../contexts/HomeContext';

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

function FilterSide() {
  const [state, dispatch] = useReducer(reducer, { genres: {} });
  const [filterIsOpen, setFilterIsOpen] = useState(0);

  function handleClickOnHamburger() {
    if (filterIsOpen) {
      setFilterIsOpen(0);
    } else {
      setFilterIsOpen(1);
    }
  }

  return (
    <HomeContext.Provider value={state}>
      <HomeDispatchContext.Provider value={dispatch}>
        <div
          className={
            'filterside-container ' +
            (filterIsOpen ? 'filterside-container-isopen' : '')
          }
          id="filterside-container"
        >
          <div className="filterside-hamburger">
            <FontAwesomeIcon
              onClick={handleClickOnHamburger}
              icon={filterIsOpen ? faXmark : faBars}
              size="lg"
            />
          </div>
          <div className="filterside-h1">Filtrer</div>
          <div className="filterside-h2">Genre</div>
          <div className="filterside-genre-list-container">
            <GenreCheckbox genreId="action" genreName="Action" />
            <GenreCheckbox genreId="aventure" genreName="Aventure" />
          </div>
          <div className="filterside-h2">Date</div>
        </div>
      </HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
}

export default FilterSide;
