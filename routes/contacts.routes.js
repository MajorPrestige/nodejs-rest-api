const express = require('express');

const ctrl = require('../controllers/contacts.controller');
const { isValidId, isValidBody } = require('../middlewares');
const {
  schemas: { addSchema, updateFavoriteSchema },
} = require('../models/Contact');

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:contactId', isValidId, ctrl.getById);
router.post('/', isValidBody(addSchema), ctrl.add);
router.put('/:contactId', isValidId, isValidBody(addSchema),ctrl.update);
router.patch('/:contactId/favorite', isValidId, isValidBody(updateFavoriteSchema), ctrl.updateFavorite);
router.delete('/:contactId', isValidId, ctrl.remove);


module.exports = router;
