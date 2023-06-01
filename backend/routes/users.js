import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

router.get('/', function (req, res) { // Renvoie tous les users
  appDataSource
    .getRepository(User)
    .find({})
    .then(function (users) {
      res.json({ users: users });
    });
});

router.post('/new', function (req, res) { // Crée un user
  const userRepository = appDataSource.getRepository(User);
  const newUser = userRepository.create({
    user_email: req.body.email,
    user_firstname: req.body.firstname,
    user_lastname: req.body.lastname,
    user_pseudo: req.body.pseudo,
    user_date_of_birth: req.body.date_of_birth,
    user_password: req.body.password,
    user_salt: req.body.salt
  });

  userRepository
    .insert(newUser)
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.error(error);
      if (error.code === '23505') {
        res.status(400).json({
          message: `L'utilisateur avec l'email "${newUser.email}" existe déjà.`,
        });
      } else {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur.' });
      }
    });
});

router.delete('/:userId', function (req, res) {
  appDataSource
    .getRepository(User)
    .delete({ user_id: req.params.userId })
    .then(function () {
      res.status(204).json({ message: 'User supprimé avec succès.' });
    })
    .catch(function () {
      res.status(500).json({ message: 'Une erreur est survenue lors de la supression du user.' });
    });
});

export default router;
