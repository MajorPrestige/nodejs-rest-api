const express = require('express');

const ctrl = require('../controllers/contacts.controller');
const { isValidId, isValidBody, authenticate } = require('../middlewares');
const {
  schemas: { addSchema, updateFavoriteSchema },
} = require('../models/Contact');

const router = express.Router();

router.get('/', authenticate, ctrl.getAll);
router.get('/:contactId', authenticate, isValidId, ctrl.getById);
router.post('/', authenticate, isValidBody(addSchema), ctrl.add);
router.put(
  '/:contactId',
  authenticate,
  isValidId,
  isValidBody(addSchema),
  ctrl.update
);
router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  isValidBody(updateFavoriteSchema),
  ctrl.updateFavorite
);
router.delete('/:contactId', authenticate, isValidId, ctrl.remove);

module.exports = router;
