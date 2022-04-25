import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    res.status(401);
    throw new Error('Unauthenticated, no token');
  }
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.userId).select('-password');
    next();
  } catch (error) {
    res.status(401);
    throw new Error('Unauthenticated, no token');
  }
};

export { protect };
