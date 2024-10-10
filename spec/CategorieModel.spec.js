import {
  getAllCategories,
  getCategorieById,
  createCategorie,
  updateCategorie,
  deleteCategorie,
} from '../src/models/CategorieModel.js';
import db from '../src/config/dbConfig.js';

describe('CategorieModel', () => {
  it('should get all categories', async () => {
    const mockCategories = [
      { id: 1, nom: 'Entrées' },
      { id: 2, nom: 'Plats' },
    ];

    spyOn(db, 'query').and.returnValue([mockCategories]);

    const result = await getAllCategories();

    expect(result).toEqual(mockCategories);
  });

  it('should get a category by ID', async () => {
    const mockCategory = { id: 1, nom: 'Entrées' };

    spyOn(db, 'query').and.returnValue([[mockCategory]]);

    const result = await getCategorieById(1);

    expect(result).toEqual(mockCategory);
  });

  it('should create a category', async () => {
    const mockResult = { insertId: 1 };

    spyOn(db, 'query').and.returnValue([mockResult]);

    const result = await createCategorie('Desserts');

    expect(result).toEqual(mockResult);
  });

  it('should update a category', async () => {
    const mockResult = { affectedRows: 1 };

    spyOn(db, 'query').and.returnValue([mockResult]);

    const result = await updateCategorie(1, 'Updated Category');

    expect(result).toEqual(mockResult);
  });

  it('should delete a category', async () => {
    const mockResult = { affectedRows: 1 };

    spyOn(db, 'query').and.returnValue([mockResult]);

    const result = await deleteCategorie(1);

    expect(result).toEqual(mockResult);
  });
});