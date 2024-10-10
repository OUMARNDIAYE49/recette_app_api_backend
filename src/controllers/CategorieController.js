// src/controllers/categorieController.js
import {
  getAllCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
  getCategorieByName, // Fonction pour vérifier l'unicité
} from '../models/CategorieModel.js';

export const getAllCategoriesController = async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des catégories.',
      error: error.message,
    });
  }
};

export const getCategorieByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategorieById(id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Catégorie non trouvée.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la récupération de la catégorie.',
      error: error.message,
    });
  }
};

// Nouvelle fonction pour rechercher une catégorie par nom
export const getCategorieByNameController = async (req, res) => {
  const { nom } = req.query;

  if (!nom) {
    return res
      .status(400)
      .json({ message: 'Le paramètre "nom" est requis pour la recherche.' });
  }

  try {
    const category = await getCategorieByName(nom);
    if (category) {
      return res.status(200).json(category);
    } else {
      return res
        .status(404)
        .json({ message: 'Aucune catégorie trouvée avec ce nom.' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la recherche de la catégorie.',
      error: error.message,
    });
  }
};

export const createCategorieController = async (req, res) => {
  const { nom } = req.body;
  try {
    // Vérifier l'unicité du nom
    const existingCategory = await getCategorieByName(nom);
    if (existingCategory) {
      return res
        .status(400)
        .json({ message: 'Une catégorie avec ce nom existe déjà.' });
    }

    const result = await createCategorie(nom);
    res
      .status(201)
      .json({ message: 'Catégorie créée avec succès', categorie: result });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la création de la catégorie.',
      error: error.message,
    });
  }
};

export const updateCategorieController = async (req, res) => {
  const { id } = req.params;
  const { nom } = req.body;
  
  try {
    // Vérifier si l'ID existe
    const existingCategory = await getCategorieById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: `Catégorie avec l'ID ${id} non trouvée.` });
    }

    // Vérifier l'unicité du nom
    const categoryWithSameName = await getCategorieByName(nom);
    if (categoryWithSameName && categoryWithSameName.id !== parseInt(id)) {
      return res
        .status(400)
        .json({ message: 'Le nom est déjà utilisé par une autre catégorie.' });
    }

    await updateCategorie(id, nom);
    res.status(200).json({ message: 'Catégorie mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la mise à jour de la catégorie.',
      error: error.message,
    });
  }
};

export const deleteCategorieController = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Vérifier si l'ID existe
    const existingCategory = await getCategorieById(id);
    if (!existingCategory) {
      return res.status(404).json({ message: `Catégorie avec l'ID ${id} non trouvée.` });
    }

    await deleteCategorie(id);
    res.status(200).json({ message: 'Catégorie supprimée avec succès' });
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la suppression de la catégorie.',
      error: error.message,
    });
  }
};
