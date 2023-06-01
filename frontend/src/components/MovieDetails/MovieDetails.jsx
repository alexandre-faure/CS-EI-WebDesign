import './MovieDetails.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { HomeContext, HomeDispatchContext } from '../../contexts/HomeContext';

function MovieDetails(data) {
  const state = useContext(HomeContext);
  const dispatch = useContext(HomeDispatchContext);
  function handleClickOnDetailsCross() {
    dispatch({ type: 'closeDetails' });
  }

  return (
    <div
      className="movie-details-container"
      style={{ display: state.movieDetailsIsOpen ? 'flex' : 'none' }}
      onClick={handleClickOnDetailsCross}
    >
      <div
        className="movie-details-card"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <FontAwesomeIcon
          icon={faXmark}
          id="movie-details-cross"
          className="movie-details-cross"
          size="xl"
          onClick={handleClickOnDetailsCross}
        />
      </div>
    </div>
  );
}

export default MovieDetails;
