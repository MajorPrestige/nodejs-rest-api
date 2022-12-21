const express = require('express');

const ctrl = require('../../controllers/contacts');
const { ctrlWrapper } = require('../../helpers');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAll));
router.get('/:contactId', ctrlWrapper(ctrl.getById));
router.post('/', ctrlWrapper(ctrl.add));
router.put('/:contactId', ctrlWrapper(ctrl.update));
router.patch('/:contactId/favorite', ctrlWrapper(ctrl.updateFavorite));
router.delete('/:contactId', ctrlWrapper(ctrl.remove));

module.exports = router;
