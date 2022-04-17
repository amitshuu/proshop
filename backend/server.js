import express from 'express';
import products from './data/products.js';
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

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
