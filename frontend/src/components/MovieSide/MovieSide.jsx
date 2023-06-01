import './MovieSide.css';
import { useContext } from 'react';
import MovieSlider from '../MovieSlider/MovieSlider';
import { HomeContext } from '../../contexts/HomeContext';

function MovieSide() {
  const state = useContext(HomeContext);

  return (
    <div className="movie-side-container">
      {state.homeSliders.map((slider) => {
        return (
          <MovieSlider
            slider_id={slider.slider_id}
            title={slider.title}
            movieList={slider.movies}
            key={slider.title}
          />
        );
      })}
    </div>
  );
}

export default MovieSide;
