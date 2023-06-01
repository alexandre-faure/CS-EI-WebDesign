import MovieCard from '../MovieCard/MovieCard';
import './FullPageList.css';

function FullPageList(data) {
  return (
    <div className="full-page-list-container">
      {data.movies.map((movie) => {
        return <MovieCard movie={movie} key={movie.poster_path} />;
      })}
    </div>
  );
}

export default FullPageList;
