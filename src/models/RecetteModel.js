import db from '../config/dbConfig.js';

// Récupérer toutes les recettes
export const getAllRecettes = async () => {
  const [results] = await db.query('SELECT * FROM recettes');
  return results;
};

// Récupérer une recette par ID
export const getRecetteById = async id => {
  const [results] = await db.query('SELECT * FROM recettes WHERE id = ?', [id]);
  return results.length > 0 ? results[0] : null;
};

// Créer une nouvelle recette
export const createRecette = async (titre, ingredients, type, categorie_id) => {
  // Vérifier si le titre est déjà pris
  const existingRecette = await getRecetteByTitle(titre);
  if (existingRecette) {
    throw new Error('Le titre de la recette doit être unique.');
  }

  const [result] = await db.query(
    'INSERT INTO recettes (titre, ingredients, type, categorie_id) VALUES (?, ?, ?, ?)',
    [titre, ingredients, type, categorie_id]
  );
  return result;
};

// Récupérer une recette par titre (ajouté pour la vérification d'unicité)
export const getRecetteByTitle = async titre => {
  const [rows] = await db.query('SELECT * FROM recettes WHERE titre = ?', [
    titre,
  ]);
  return rows.length > 0 ? rows[0] : null;
};

// Mettre à jour une recette
export const updateRecette = async (
  id,
  titre,
  ingredients,
  type,
  categorie_id
) => {
  const existingRecette = await getRecetteById(id);
  if (!existingRecette) {
    throw new Error('Recette non trouvée.');
  }

  const [result] = await db.query(
    'UPDATE recettes SET titre = ?, ingredients = ?, type = ?, categorie_id = ? WHERE id = ?',
    [titre, ingredients, type, categorie_id, id]
  );
  return result;
};

// Supprimer une recette
export const deleteRecette = async id => {
  const [result] = await db.query('DELETE FROM recettes WHERE id = ?', [id]);
  return result;
};

// Rechercher des recettes par nom
export const searchRecettesByName = async nom => {
  const query = 'SELECT * FROM recettes WHERE titre LIKE ?';
  const [results] = await db.query(query, [`%${nom}%`]);
  return results;
};
