import './GenreCheckbox.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck } from '@fortawesome/free-solid-svg-i  ';
import { faSquare } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import $ from 'jquery';
import { HomeContext, HomeDispatchContext } from '../../contexts/HomeContext';

function GenreCheckbox(data) {
  var boxIcon;
  const state = useContext(HomeContext);
  const dispatch = useContext(HomeDispatchContext);

  function handleCheckboxClick() {
    dispatch({
      type: 'toggleGenre',
      payload: { genreId: data.genreId },
    });
  }

  boxIcon = data.genreId in state.genres ? faSquareCheck : faSquare;

  return (
    <div className="filterside-genre">
      <label>
        <FontAwesomeIcon
          icon={boxIcon}
          id={data.genreId}
          className="filterside-genre-checkbox"
          onClick={handleCheckboxClick}
        />
        <div className="filterside-genre-title">{data.genreName}</div>
      </label>
    </div>
  );
}

export default GenreCheckbox;
