const router = require('express').Router();

const {loginValidation, userValidation} = require("../middlewares/validationJoi");
const {login, createUser} = require("../controllers/users");
const auth = require("../middlewares/auth");
const {NotFoundError} = require("../errors/NotFoundError");

router.post('/signin', loginValidation, login);
router.post('/signup', userValidation, createUser);

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
