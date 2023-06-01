import './MovieSide.css';
import { useContext } from 'react';
import MovieSlider from '../MovieSlider/MovieSlider';
import { HomeContext } from '../../contexts/HomeContext';
import WelcomeBox from '../WelcomeBox/WelcomeBox';
import FullPageList from '../FullPageList/FullPageList';

function MovieSide() {
  const state = useContext(HomeContext);

  const searchBarIsEmpty = state.searchBar === '';

  return (
    <div className="movie-side-container">
      <WelcomeBox />

      {searchBarIsEmpty ? (
        state.homeSliders.map((slider) => {
          return (
            <MovieSlider
              slider_id={slider.slider_id}
              title={slider.title}
              movieList={slider.movies}
              key={slider.title}
            />
          );
        })
      ) : (
        <FullPageList movies={state.homeSliders[0].movies} />
      )}
    </div>
  );
}

export default MovieSide;
