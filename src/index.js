require('dotenv').config();
const express = require('express');
const config = require('./config/');
const port = config.port;

// MW
const cors = require('./middlewares/cors');
const logger = require('./middlewares/logger');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');

// Routes
const itemsRouter = require('./routes/');

const app = express();

app.use(express.json());

app.use(logger);

app.use(cors);

app.use(itemsRouter);

// 404
app.use(notFound);

// 500
app.use(errorHandler);

app.listen(port, () => {
  console.info('Server is up on port \x1b[32m%s\x1b[0m', port);
});
