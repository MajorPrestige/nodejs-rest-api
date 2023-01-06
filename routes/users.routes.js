const express = require('express');

const ctrl = require('../controllers/users.controller');
const { isValidBody, authenticate, upload } = require('../middlewares');
const {
  shemas: {
    userSignupSchema,
    userSigninSchema,
    userUpdateSubscriptionSchema,
    userUpdateAvatarSchema,
  },
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
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatarURL'),
  isValidBody(userUpdateAvatarSchema),
  ctrl.updateAvatar
);
router.get('/signout', authenticate, ctrl.signout);
router.get('/current', authenticate, ctrl.current);

module.exports = router;
