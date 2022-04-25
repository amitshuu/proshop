import 'express-async-errors';
import express from 'express';
import 'dotenv/config';

//DB connection
import connectDB from './db/connect.js';
//Middlewares
import errorHandlerMiddleware from './middleware/error-handler.js';
import notFoundMiddleware from './middleware/not-found.js';

//Routes
import productRoute from './routes/productRoute.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Api is runing ....');
});

app.use('/api/products', productRoute);
app.use('/api/users', userRoutes);

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
