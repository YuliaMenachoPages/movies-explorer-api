const Movie = require('../models/movie');
const { handleCustomError } = require('../middlewares/handleCustomError');
const { ForbiddenAccessError } = require('../errors/ForbiddenAccessError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(['owner', '_id'])
    .then((movies) => res.send(movies))
    .catch((err) => handleCustomError(err, res, next));
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => handleCustomError(err, res, next));
};

module.exports.deleteMovieById = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenAccessError('Недостаточно прав для удаления фильма.');
      }
      Movie.findByIdAndRemove(req.params._id)
        .then((deletedMovie) => res.send(deletedMovie))
        .catch((err) => handleCustomError(err, res, next));
    })
    .catch((err) => handleCustomError(err, res, next));
};
