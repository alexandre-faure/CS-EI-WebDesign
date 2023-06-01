import { useContext } from 'react';
import './MovieCard.css';
import { HomeContext, HomeDispatchContext } from '../../contexts/HomeContext';

function MovieCard(data) {
  const state = useContext(HomeContext);
  const dispatch = useContext(HomeDispatchContext);
  function handleClickOnMovieCard() {
    dispatch({ type: 'openDetails' });
  }

  return (
    <div className="moviecard-container" onClick={handleClickOnMovieCard}>
      <img
        className="moviecard-image"
        src={'https://image.tmdb.org/t/p/w500' + data.movie.poster_path}
        alt="alt"
      />
      <div className="moviecard-gradient"></div>
      <div className="moviecard-title">{data.movie.title}</div>
    </div>
  );
}

export default MovieCard;
