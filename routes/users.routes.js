const express = require('express');

const ctrl = require('../controllers/users.controller');
const { isValidBody, authenticate, upload } = require('../middlewares');
const {
  shemas: { userSignupSchema, userSigninSchema, userUpdateSubscriptionSchema, userEmailSchema },
} = require('../models/User');

const router = express.Router();

router.post('/signup', isValidBody(userSignupSchema), ctrl.signup);
router.get('/verify/:verificationToken', ctrl.verify);
router.post("/verify", isValidBody(userEmailSchema), ctrl.resendEmail)


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

  /* 
upload.single("NAME") - //* one file
upload.array("NAME",  8) - //* 8 files
upload.fileds([{
  name: "NAME"
  maxCount: 100
}]) -  //* can create more fields
  */

  upload.single('avatarURL'),
  ctrl.updateAvatar
);

router.get('/signout', authenticate, ctrl.signout);
router.get('/current', authenticate, ctrl.current);

module.exports = router;
