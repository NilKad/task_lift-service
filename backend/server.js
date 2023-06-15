const path = require('path');
const configPath = path.join(__dirname, '..', 'config', '.env');
require('dotenv').config({ path: configPath });

const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { mainRouter } = require('./routers/api');
const { errorHandler } = require('./helpers');

const { PORT = 5001 } = process.env;
const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/lift', mainRouter);

app.use((req, res) => {
  console.log('!!!!! APP (req, res) !!!!!!');
  res.status(404); // .json({ message: "Not found", data: null });
  res.json({ messages: 'ERRR JSONS' });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
