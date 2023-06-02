import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import $ from 'jquery';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard/MovieCard';

import './MovieSlider.css';
import { HomeContext } from '../../contexts/HomeContext';

function MovieSlider(data) {
  const state = useContext(HomeContext);
  const [movies, setMovies] = useState([]);

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

    const fetchData = async (slider_id) => {
      const filters = {
        genres: Object.keys(state.genres),
        dates: Object.keys(state.dates),
        searchBar: state.searchBar,
      };
      const user_id = state.user_id;
      const parameters = {
        sort: slider_id,
        filters: filters,
        user_id: user_id,
      };
      await axios
        .get('http://localhost:8000/movies', {
          params: {
            settings: JSON.stringify(parameters),
          },
        })
        .then((response) => {
          setMovies(response.data.movies);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData(data.slider_id);
  }, [state.genres, state.searchBar, state.dates, state.movieDetailsIsOpen]);

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
            {movies.map((movie) => {
              return (
                <MovieCard
                  movie={movie}
                  image={
                    'url(https://image.tmdb.org/t/p/w500' + movie.poster_path
                  }
                  key={movie.title}
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
