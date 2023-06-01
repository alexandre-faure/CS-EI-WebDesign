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
      <img className="moviecard-image" src={data.image} alt="alt" />
      <div className="moviecard-gradient"></div>
      <div className="moviecard-title">La La Land</div>
    </div>
  );
}

export default MovieCard;
