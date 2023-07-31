const router = require('express').Router();
const { movieValidation, movieIdValidation } = require('../middlewares/validationJoi');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', movieValidation, createMovie);
router.delete('/:_id', movieIdValidation, deleteMovieById);

module.exports = router;
