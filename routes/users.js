const router = require('express').Router();
const { userInfoValidation } = require('../middlewares/validationJoi');

const {
  updateUserInfo, getUserInfo,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.patch('/me', userInfoValidation, updateUserInfo);

module.exports = router;
