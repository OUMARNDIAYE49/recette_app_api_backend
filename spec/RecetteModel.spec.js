// import './helpers/jasmineHelper.js';
// import db from '../src/config/dbConfig.js';
// import {
//   getAllRecettes,
//   getRecetteById,
//   createRecette,
//   updateRecette,
//   deleteRecette,
// } from '../src/models/RecetteModel.js';

// describe('Recette Model', () => {
//   beforeAll(async () => {
//     await db.query('DELETE FROM recettes');
//   });

//   afterAll(async () => {
//     await db.query('DELETE FROM recettes');
//     await db.end();
//   });

//   it('should create a recette', async () => {
//     const recette = await createRecette(
//       'Titre de Test',
//       'Ingrédients de Test',
//       'plat'
//     );
//     expect(recette.affectedRows).toBe(1);
//   });

//   it('should get all recettes', async () => {
//     await createRecette('Titre de Test', 'Ingrédients de Test', 'plat');
//     const recettes = await getAllRecettes();
//     expect(recettes.length).toBeGreaterThan(0);
//   });

//   it('should get a recette by ID', async () => {
//     const createdRecette = await createRecette(
//       'Titre de Test',
//       'Ingrédients de Test',
//       'plat'
//     );
//     const recette = await getRecetteById(createdRecette.insertId);
//     expect(recette).not.toBeNull();
//     expect(recette).toEqual({
//       id: createdRecette.insertId,
//       titre: 'Titre de Test',
//       ingredient: 'Ingrédients de Test',
//       type: 'plat',
//     });
//   });

//   it('should update a recette', async () => {
//     const createdRecette = await createRecette(
//       'Titre de Test',
//       'Ingrédients de Test',
//       'plat'
//     );
//     const updatedRecette = await updateRecette(
//       createdRecette.insertId,
//       'Titre Mis à Jour',
//       'Ingrédients Mis à Jour',
//       'plat'
//     );
//     expect(updatedRecette.affectedRows).toBe(1);
//   });

//   it('should delete a recette', async () => {
//     const createdRecette = await createRecette(
//       'Titre de Test',
//       'Ingrédients de Test',
//       'plat'
//     );
//     const result = await deleteRecette(createdRecette.insertId);
//     expect(result.affectedRows).toBe(1);
//   });
// });

import './helpers/jasmineHelper.js';
import db from '../src/config/dbConfig.js';
import {
  getAllRecettes,
  getRecetteById,
  createRecette,
  updateRecette,
  deleteRecette,
} from '../src/models/RecetteModel.js';

describe('RecetteModel', () => {
  // Nettoyage avant chaque test pour éviter des conflits
  beforeEach(async () => {
    await db.query('DELETE FROM recettes'); // Supprimer toutes les recettes pour un état propre
  });

  it('devrait récupérer toutes les recettes', async () => {
    // Insérer une recette pour le test
    await createRecette(
      'Salade César',
      'Laitue, Poulet, Parmesan, Croûtons, Sauce César',
      'Entrée',
      1
    );

    const recettes = await getAllRecettes();
    expect(recettes).toBeDefined();
    expect(Array.isArray(recettes)).toBe(true);
    expect(recettes.length).toBe(1);
  });

  it('devrait récupérer une recette par ID', async () => {
    const nouvelleRecette = await createRecette(
      'Pizza Margherita',
      'Tomates, Mozzarella, Basilic, Pâte à pizza',
      'Plat principal',
      2
    );

    const recette = await getRecetteById(nouvelleRecette.insertId);
    expect(recette).toBeDefined();
    expect(recette.id).toBe(nouvelleRecette.insertId);
  });

  it('devrait créer une nouvelle recette', async () => {
    const result = await createRecette(
      'Tarte aux pommes',
      'Pommes, Sucre, Beurre, Pâte feuilletée',
      'Dessert',
      3
    );
    expect(result).toBeDefined();
    expect(result.affectedRows).toBe(1);
  });

  it('devrait mettre à jour une recette existante', async () => {
    const nouvelleRecette = await createRecette(
      'Soupe de légumes',
      'Carottes, Pommes de terre, Oignons, Eau',
      'Entrée',
      1
    );

    const result = await updateRecette(
      nouvelleRecette.insertId,
      'Soupe de légumes améliorée',
      'Carottes, Pommes de terre, Oignons, Épices, Eau',
      'Entrée',
      1
    );
    expect(result.affectedRows).toBe(1);

    const updatedRecette = await getRecetteById(nouvelleRecette.insertId);
    expect(updatedRecette.titre).toBe('Soupe de légumes améliorée');
  });

  it('devrait supprimer une recette par ID', async () => {
    const nouvelleRecette = await createRecette(
      'Crêpes au Nutella',
      'Farine, Lait, Oeufs, Nutella',
      'Dessert',
      3
    );

    const result = await deleteRecette(nouvelleRecette.insertId);
    expect(result.affectedRows).toBe(1);

    const recetteSupprimee = await getRecetteById(nouvelleRecette.insertId);
    expect(recetteSupprimee).toBeNull(); // Vérifie que la recette n'existe plus
  });
});
