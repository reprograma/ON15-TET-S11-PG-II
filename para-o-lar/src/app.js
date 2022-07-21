const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const routes = require('./routes/academia');
app.use('/academia', routes);

module.exports = app;