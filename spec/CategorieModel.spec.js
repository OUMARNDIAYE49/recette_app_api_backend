import './helpers/jasmineHelper.js';
import db from '../src/config/dbConfig.js'; // Réintroduire l'importation de db
import {
  getAllCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from '../src/models/CategorieModel.js';

describe('CategorieModel', () => {
  // Nettoyage avant chaque test pour éviter des conflits
  beforeEach(async () => {
    await db.query('DELETE FROM categories'); // Supprimer toutes les catégories pour un état propre
  });

  const categoriesDeTest = [
    { nom: 'Entrée' },
    { nom: 'Plat principal' },
    { nom: 'Dessert' },
    { nom: 'Boisson' },
    { nom: 'Salade' },
  ];

  it('devrait récupérer toutes les catégories', async () => {
    // Insérer plusieurs catégories pour le test
    for (const categorie of categoriesDeTest) {
      await createCategorie(categorie.nom);
    }

    const categories = await getAllCategories();
    expect(categories).toBeDefined();
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBe(categoriesDeTest.length);
  });

  it('devrait récupérer une catégorie par ID', async () => {
    const nouvelleCategorie = await createCategorie('Plat principal');

    const categorie = await getCategorieById(nouvelleCategorie.insertId);
    expect(categorie).toBeDefined();
    expect(categorie.id).toBe(nouvelleCategorie.insertId);
    expect(categorie.nom).toBe('Plat principal');
  });

  it('devrait créer une nouvelle catégorie', async () => {
    const result = await createCategorie('Dessert');
    expect(result).toBeDefined();
    expect(result.affectedRows).toBe(1);
  });

  it('devrait mettre à jour une catégorie existante', async () => {
    const nouvelleCategorie = await createCategorie('Boisson');

    const result = await updateCategorie(
      nouvelleCategorie.insertId,
      'Boisson froide'
    );
    expect(result.affectedRows).toBe(1);

    const updatedCategorie = await getCategorieById(nouvelleCategorie.insertId);
    expect(updatedCategorie.nom).toBe('Boisson froide');
  });

  it('devrait supprimer une catégorie par ID', async () => {
    const nouvelleCategorie = await createCategorie('Salade');

    const result = await deleteCategorie(nouvelleCategorie.insertId);
    expect(result.affectedRows).toBe(1);

    const categorieSupprimee = await getCategorieById(
      nouvelleCategorie.insertId
    );
    expect(categorieSupprimee).toBeNull(); // Vérifie que la catégorie n'existe plus
  });
});
