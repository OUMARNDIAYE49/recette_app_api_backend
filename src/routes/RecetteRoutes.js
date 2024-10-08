import express from 'express';
import {
  getAllRecettesController,
  getRecetteByIdController,
  createRecetteController,
  updateRecetteController,
  deleteRecetteController,
  searchRecettesController, // Nouvelle méthode ajoutée ici
} from '../controllers/RecetteController.js';

const router = express.Router();

router.get('/recipes', getAllRecettesController);
router.get('/recipe/:id', getRecetteByIdController);
router.post('/recipes', createRecetteController);
router.put('/recipe/:id', updateRecetteController);
router.delete('/recipe/:id', deleteRecetteController);

// Route pour rechercher des recettes par nom
router.get('/recipes/search', searchRecettesController);

export default router;
