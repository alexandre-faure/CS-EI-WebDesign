import FilterSide from '../../components/FilterSide/FilterSide';
import MovieSide from '../../components/MovieSide/MovieSide';
import SearchBar from '../../components/SearchBar/SearchBar';

import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <SearchBar />
      <FilterSide />
      <MovieSide />
    </div>
  );
}

export default Home;
