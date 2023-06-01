import './FilterSide.css';
import { useContext, useEffect, useReducer, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import GenreCheckbox from '../GenreCheckbox/GenreCheckbox';
import { HomeContext, HomeDispatchContext } from '../../contexts/HomeContext';

function FilterSide() {
  const state = useContext(HomeContext);
  const dispatch = useContext(HomeDispatchContext);
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
              icon={filterIsOpen ? faChevronUp : faChevronDown}
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
