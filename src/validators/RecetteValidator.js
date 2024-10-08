//recetteRoutes
import { body, validationResult } from 'express-validator';

export const validateRecette = [
  body('titre')
    .trim()
    .notEmpty()
    .withMessage('Le titre est requis.')
    .isLength({ min: 5, max: 100 })
    .withMessage('Le titre doit contenir 5 et au maximum 100 caractères.'),

  body('ingredients')
    .trim()
    .notEmpty()
    .withMessage('Les ingrédients sont requis.')
    .isLength({ min: 10, max: 500 })
    .withMessage(
      'Les ingrédients doivent contenir au moins 10 et au maximum 500 caractères.'
    ),

  body('type')
    .trim()
    .notEmpty()
    .withMessage('Le type de recette est requis.')
    .isIn(['entrée', 'plat', 'dessert'])
    .withMessage('Le type de recette doit être entrée, plat ou dessert.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
