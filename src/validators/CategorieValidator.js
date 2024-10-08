// categorieRoutes
import { body, validationResult } from 'express-validator';

export const validateCategorie = [
  body('nom')
    .trim()
    .notEmpty()
    .withMessage('Le nom de la catégorie est requis.')
    .isLength({ max: 100 })
    .withMessage('Le nom de la catégorie doit depassé 100 caractères.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
