import { useContext, useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';
import './FullPageList.css';
import { HomeContext } from '../../contexts/HomeContext';
import axios from 'axios';

function FullPageList(data) {
  const state = useContext(HomeContext);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
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
    fetchData(state.activeDisplay);
  });

  return (
    <div className="full-page-list-container">
      {movies.map((movie) => {
        return <MovieCard movie={movie} key={movie.title} />;
      })}
    </div>
  );
}

export default FullPageList;
