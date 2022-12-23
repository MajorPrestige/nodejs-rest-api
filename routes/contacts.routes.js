const express = require('express');

// const ctrl = require('../controllers/contacts');
// const { ctrlWrapper } = require('../helpers');
const ctrl = require('../controllers/contacts.controller');

const router = express.Router();

router.get('/', ctrl.getAll);
router.get('/:contactId', ctrl.getById);
router.post('/', ctrl.add);
router.put('/:contactId', ctrl.update);
router.patch('/:contactId/favorite', ctrl.updateFavorite);
router.delete('/:contactId', ctrl.remove);

// router.get('/', ctrlWrapper(ctrl.getAll));
// router.get('/:contactId', ctrlWrapper(ctrl.getById));
// router.post('/', ctrlWrapper(ctrl.add));
// router.put('/:contactId', ctrlWrapper(ctrl.update));
// router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateFavorite));
// router.delete('/:contactId', ctrlWrapper(ctrl.remove));

module.exports = router;
