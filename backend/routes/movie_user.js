import express from 'express';
import { appDataSource } from '../datasource.js';
import Movie_User from '../entities/movie_user.js';

const router = express.Router();

// Tentative de connexion
router.post('', function (req, res) {
  const params = req.body.params;
  console.log(params);
  appDataSource
    .getRepository(Movie_User)
    .find({
      where: {
        movie_user_id_user: params.user_id,
        movie_user_id_movie: params.movie_id,
      },
    })
    .then((movie_user) => {
      let value_user_movie = {
        movie_user_id_user: params.user_id,
        movie_user_id_movie: params.movie_id,
        movie_user_status: 'status' in params ? params.status : 0,
        movie_user_like: 'vote' in params ? params.vote : 0,
      };
      console.log(value_user_movie);
      if (movie_user.length === 1) {
        // On met à jour la valeur
        if ('status' in params) {
          value_user_movie = {
            ...value_user_movie,
            movie_user_like: movie_user[0].movie_user_like,
          };
        } else if ('vote' in params) {
          value_user_movie = {
            ...value_user_movie,
            movie_user_vote: movie_user[0].movie_user_vote,
          };
        }
        appDataSource
          .createQueryBuilder()
          .update(Movie_User)
          .set(value_user_movie)
          .where(`movie_user_id_user = ${params.user_id}`)
          .andWhere(`movie_user_id_movie = ${params.movie_id}`)
          .execute()
          .then(function () {
            res.status(204).json({ message: 'Movie_User mis à jour.' });
          })
          .catch(function () {
            res.status(500).json({
              message:
                'Une erreur est survenue lors de la mise à jour du movie_user.',
            });
          });
      } else {
        // On crée la valeur
        appDataSource
          .createQueryBuilder()
          .insert()
          .into(Movie_User)
          .values([value_user_movie])
          .execute()
          .then(function () {
            res.status(204).json({ message: 'Movie_User créé.' });
          })
          .catch(function () {
            res.status(500).json({
              message:
                'Une erreur est survenue lors de la création du movie_user.',
            });
          });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

export default router;
