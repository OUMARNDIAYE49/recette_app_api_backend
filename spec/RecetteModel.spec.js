import {
  getAllRecettes,
  getRecetteById,
  createRecette,
  updateRecette,
  deleteRecette,
  searchRecettesByName,
} from '../src/models/RecetteModel.js';
import db from '../src/config/dbConfig.js';

describe('RecetteModel', () => {
  it('should get all recipes', async () => {
    const mockRecettes = [
      { id: 1, titre: 'Tarte aux pommes' },
      { id: 2, titre: 'Poulet rôti' },
    ];

    spyOn(db, 'query').and.returnValue([mockRecettes]);

    const result = await getAllRecettes();

    expect(result).toEqual(mockRecettes);
  });

  it('should get a recipe by ID', async () => {
    const mockRecette = { id: 1, titre: 'Tarte aux pommes' };

    spyOn(db, 'query').and.returnValue([[mockRecette]]);

    const result = await getRecetteById(1);

    expect(result).toEqual(mockRecette);
  });

  it('should create a recipe', async () => {
    const mockResult = { insertId: 1 };

    spyOn(db, 'query').and.returnValue([mockResult]);

    const result = await createRecette('Quiche', 'Oeufs, Lardons', 'Plat', 1);

    expect(result).toEqual(mockResult);
  });

  it('should update a recipe', async () => {
    const mockRecette = { id: 1, titre: 'Quiche', ingredients: 'Oeufs, Lardons', type: 'Plat', categorie_id: 1 };
    const mockResult = { affectedRows: 1 };

    spyOn(db, 'query').and.callFake((query, params) => {
        if (query.includes('SELECT * FROM recettes WHERE id = ?')) {
            return [[mockRecette]]; 
        }
        if (query.includes('UPDATE recettes SET')) {
            return [mockResult]; 
        }
        return [[]];
    });

    const result = await updateRecette(1, 'Updated Quiche', 'Oeufs, Lardons', 'Plat', 1);

    expect(result).toEqual(mockResult);
});


  it('should delete a recipe', async () => {
    const mockResult = { affectedRows: 1 };

    spyOn(db, 'query').and.returnValue([mockResult]);

    const result = await deleteRecette(1);

    expect(result).toEqual(mockResult);
  });

  it('should search for recipes by name', async () => {
    const mockRecettes = [{ id: 1, titre: 'Tarte aux pommes' }];

    spyOn(db, 'query').and.returnValue([mockRecettes]);

    const result = await searchRecettesByName('Tarte');

    expect(result).toEqual(mockRecettes);
  });
});