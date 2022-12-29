const express = require('express');

const ctrl = require('../controllers/users.controller');
const { isValidBody } = require('../middlewares');
const {
  shemas: { userSignupSchema, userSigninSchema },
} = require('../models/User');

const router = express.Router();

router.post('/signup', isValidBody(userSignupSchema), ctrl.signup);
router.post('/signin', isValidBody(userSigninSchema), ctrl.signin);
router.post('/signout', ctrl.signout);
router.get('/current', ctrl.current);

module.exports = router;
