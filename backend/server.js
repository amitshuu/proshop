import express from 'express';
import products from './data/products.js';
import 'dotenv/config';
import connectDB from './db/connect.js';

const app = express();

app.get('/', (req, res) => {
  res.send('Api is runing ....');
});

app.get('/api/products', (req, res) => {
  res.send(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((product) => product._id === req.params.id);
  res.send(product);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow
      .bold
  );
  connectDB();
});
