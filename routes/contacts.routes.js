const express = require('express');

// const ctrl = require('../controllers/contacts');
// const { ctrlWrapper } = require('../helpers');
const ctrl = require('../controllers/contacts.controller');
const { isValidId } = require('../middlewares');

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:contactId', isValidId, ctrl.getById);
router.post('/', ctrl.add);
router.put('/:contactId', isValidId, ctrl.update);
router.patch('/:contactId/favorite', isValidId, ctrl.updateFavorite);
router.delete('/:contactId', isValidId, ctrl.remove);

// router.get('/', ctrlWrapper(ctrl.getAll));
// router.get('/:contactId', ctrlWrapper(ctrl.getById));
// router.post('/', ctrlWrapper(ctrl.add));
// router.put('/:contactId', ctrlWrapper(ctrl.update));
// router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateFavorite));
// router.delete('/:contactId', ctrlWrapper(ctrl.remove));

module.exports = router;
