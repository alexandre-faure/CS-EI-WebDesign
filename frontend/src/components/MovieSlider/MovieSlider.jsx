import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { useEffect } from 'react';
import image1 from './test-images/1.jpg';
import image2 from './test-images/2.jpg';
import image3 from './test-images/3.jpg';
import image4 from './test-images/4.jpg';
import image5 from './test-images/5.jpg';
import image6 from './test-images/6.jpg';
import image7 from './test-images/7.jpg';
import image8 from './test-images/8.jpg';
import image9 from './test-images/9.jpg';
import MovieCard from '../MovieCard/MovieCard';

import './MovieSlider.css';

function MovieSlider(data) {
  useEffect(() => {
    $('#movie-slider-right-arrow-' + data.slider_id)
      .unbind()
      .on('click', () => {
        var card = $('#movie-slider-card-container-' + data.slider_id);
        var scrollLeft = card.scrollLeft();
        var newScrollLeft;
        if (scrollLeft % 210 > 120) {
          newScrollLeft = (Math.floor(scrollLeft / 210) + 2) * 210;
        } else {
          newScrollLeft = (Math.floor(scrollLeft / 210) + 1) * 210;
        }
        card.animate({ scrollLeft: String(newScrollLeft) }, 200);
      });
    $('#movie-slider-left-arrow-' + data.slider_id)
      .unbind()
      .on('click', () => {
        var card = $('#movie-slider-card-container-' + data.slider_id);
        var scrollLeft = card.scrollLeft();
        var newScrollLeft;
        if (scrollLeft % 210 > 120) {
          newScrollLeft = Math.floor(scrollLeft / 210) * 210;
        } else {
          newScrollLeft = (Math.floor(scrollLeft / 210) - 1) * 210;
        }
        card.animate({ scrollLeft: String(newScrollLeft) }, 200);
      });
  });

  return (
    <div className="movie-slider-container">
      <div className="movie-slider-title">{data.title}</div>
      <div className="movie-slider-carousel-container">
        <div
          className="movie-slider-left-arrow"
          id={'movie-slider-left-arrow-' + data.slider_id}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="2x" />
        </div>
        <div
          className="movie-slider-card-container"
          id={'movie-slider-card-container-' + data.slider_id}
        >
          <div className="movie-slider-card-scroller">
            {data.movieList.map((movie) => {
              return (
                <MovieCard
                  movie={movie}
                  image={
                    'url(https://image.tmdb.org/t/p/w500' + movie.poster_path
                  }
                  key={movie.poster_path}
                />
              );
            })}
          </div>
        </div>

        <div
          className="movie-slider-right-arrow"
          id={'movie-slider-right-arrow-' + data.slider_id}
        >
          <FontAwesomeIcon icon={faChevronRight} size="2x" />
        </div>
      </div>
    </div>
  );
}

export default MovieSlider;
