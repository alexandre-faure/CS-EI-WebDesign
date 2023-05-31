import './MovieSide.css';
import MovieSlider from '../MovieSlider/MovieSlider';

function MovieSide() {
  return (
    <div className="movie-side-container">
      <MovieSlider slider_id="pour_vous" title="Pour vous" />
      <MovieSlider slider_id="populaire" title="Populaire" />
    </div>
  );
}

export default MovieSide;
