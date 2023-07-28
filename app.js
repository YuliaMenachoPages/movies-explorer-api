const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { limiter } = require('./utils/limiter');
const { handleError } = require('./middlewares/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT_GATE, DB_PATH } = require('./utils/consts');

const { PORT = PORT_GATE, DB_URL = DB_PATH } = process.env;

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(requestLogger);
app.use(limiter);
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(handleError);
app.listen(PORT, () => {

});
