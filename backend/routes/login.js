import express from 'express';
import { appDataSource } from '../datasource.js';
import User from '../entities/user.js';

const router = express.Router();

// Tentative de connexion
router.post('/login', function (req, res) {
    appDataSource
    .getRepository(User)
    .find({
        where:{
            user_email: req.body.user_email
        }
    })
    .then((user) => {
      res.json({user: user})
    })
    .catch((error) => {
        console.log(error)
    });
});

export default router;
