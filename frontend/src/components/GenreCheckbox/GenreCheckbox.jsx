import './GenreCheckbox.css';

function GenreCheckbox(data) {
  return (
    <div className="filterside-genre">
      <label for={data.genreId}>
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
