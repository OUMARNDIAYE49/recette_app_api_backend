// src/routes/categorieRoutes.js
import express from 'express';
import {
  getAllCategoriesController,
  getCategorieByIdController,
  createCategorieController,
  updateCategorieController,
  deleteCategorieController,
} from '../controllers/CategorieController.js';

const router = express.Router();

// Routes pour les catégories
router.get('/categories', getAllCategoriesController);
router.get('/categories/:id', getCategorieByIdController);
router.post('/categories', createCategorieController); // Ceci est la route pour POST
router.put('/categories/:id', updateCategorieController);
router.delete('/categories/:id', deleteCategorieController);

export default router;
