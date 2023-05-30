import './FilterSide.css';
import GenreCheckbox from '../GenreCheckbox/GenreCheckbox';

function FilterSide() {
  return (
    <div className="filterside-container">
      <div className="filterside-h1">Filtrer :</div>
      <div className="filterside-h2">Genre</div>
      <GenreCheckbox genreId="action" genreName="Action" />
      <GenreCheckbox genreId="aventure" genreName="Aventure" />

      <div className="filterside-h2">Date</div>
    </div>
  );
}

export default FilterSide;
