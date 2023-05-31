import './MovieCard.css';

function MovieCard(data) {
  return (
    <div className="movie-slider-card">
      <img className="movie-slider-image" src={data.image} alt="alt" />
    </div>
  );
}

export default MovieCard;
