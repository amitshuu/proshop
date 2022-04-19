import 'express-async-errors';

import express from 'express';
import 'dotenv/config';
import connectDB from './db/connect.js';

import errorHandlerMiddleware from './middleware/error-handler.js';

import productRoute from './routes/productRoute.js';
import notFoundMiddleware from './middleware/not-found.js';

const app = express();

app.use('/api/products', productRoute);
app.get('/', (req, res) => {
  res.send('Api is runing ....');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(
    `Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`.yellow
      .bold
  );
  connectDB();
});
