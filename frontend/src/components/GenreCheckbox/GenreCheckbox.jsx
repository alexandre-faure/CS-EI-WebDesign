import './GenreCheckbox.css';

function GenreCheckbox(data) {
  return (
    <div className="filterside-genre">
      <label>
        <input
          type="checkbox"
          id={data.genreId}
          name={data.genreId}
          className="filterside-genre-checkbox"
        />
        {data.genreName}
      </label>
    </div>
  );
}

export default GenreCheckbox;
