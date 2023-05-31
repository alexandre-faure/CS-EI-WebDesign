import express from 'express';
import { appDataSource } from '../datasource.js';
import Category from '../entities/category.js'
const router = express.Router();

router.get('/', function (req, res) { // Renvoie toutes les catégories
    appDataSource
        .getRepository(Category)
        .find({})
        .then(function(categories){
            res.json({ categories: categories });
        });
  });

export default router;
