const express = require('express');

const ctrl = require('../controllers/users.controller');
const { isValidBody, authenticate } = require('../middlewares');
const {
  shemas: { userSignupSchema, userSigninSchema, userUpdateSubscriptionSchema },
} = require('../models/User');

const router = express.Router();

router.post('/signup', isValidBody(userSignupSchema), ctrl.signup);
router.post('/signin', isValidBody(userSigninSchema), ctrl.signin);
router.patch(
  '/subscription',
  authenticate,
  isValidBody(userUpdateSubscriptionSchema),
  ctrl.updateSubscription
);
router.get('/signout', authenticate, ctrl.signout);
router.get('/current', authenticate, ctrl.current);

module.exports = router;
