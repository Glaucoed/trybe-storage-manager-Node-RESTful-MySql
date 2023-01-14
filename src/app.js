const express = require('express');
const productsRouter = require('./routes/productsRouter');

const app = express();
app.use(express.json());

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar

app.use('/products', productsRouter);

module.exports = app;