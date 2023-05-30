import typeorm from 'typeorm';

const Movie_User = new typeorm.EntitySchema({
  name: 'movie_user',
  columns: {
    movie_user_id_movie: {
      type: Number,
      primary: true,
    },
    movie_user_id_user: {
      type: Number,
      primary: true,
    },
    movie_user_status: {
      type: Number,
    },
    movie_user_like: {
      type: Number,
    },
  },
});

export default Movie_User;
