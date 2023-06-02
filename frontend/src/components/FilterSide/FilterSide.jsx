import './FilterSide.css';
import { useContext, useEffect, useReducer, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import GenreCheckbox from '../GenreCheckbox/GenreCheckbox';
import { HomeContext, HomeDispatchContext } from '../../contexts/HomeContext';
import DateCheckbox from '../DateCheckbox/DateCheckbox';

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

  function handleClickOnDisplayOption(id) {
    dispatch({ type: 'displayUpdate', payload: { id: id } });
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
          <div className="filterside-pages-container">
            {state.displayOptions.map((display, key) => {
              return (
                <div
                  className={
                    'filterside-page-title ' +
                    (state.activeDisplay === display.id
                      ? 'filterside-active-display'
                      : '')
                  }
                  onClick={() => {
                    handleClickOnDisplayOption(display.id);
                  }}
                  key={display.id}
                >
                  {display.title}
                </div>
              );
            })}
          </div>
          <div className="filterside-h2">Genre</div>
          <div className="filterside-genre-list-container">
            {state.categories.map((category) => {
              return (
                <GenreCheckbox
                  genreId={category.category_id}
                  genreName={category.category_title}
                  key={category.category_id}
                />
              );
            })}
          </div>
          <div className="filterside-h2">Date</div>
          <div className="filterside-date-list-container">
            {state.dateCategories.map((date) => {
              return <DateCheckbox date={date} key={date.id} />;
            })}
          </div>
        </div>
      </HomeDispatchContext.Provider>
    </HomeContext.Provider>
  );
}

export default FilterSide;
