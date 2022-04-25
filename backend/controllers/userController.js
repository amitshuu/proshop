import User from '../models/User.js';
import jsonwebtoken from 'jsonwebtoken';

// @desc    User Auth
// @route   POST /api/users/login
// @access  Public

const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!email || !password) {
    res.status(401);
    throw new Error('Please provide all values');
  }

  if (user && (await user.comparePasswords(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: user.createJWT(),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Credentials');
  }
};

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  Private

const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
};

// @desc    Register new user
// @route   POST /api/users/
// @access  Public

const registerUser = async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !password || !name) {
    res.status(401);
    throw new Error('Please provide all values!');
  }
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(401);
    throw new Error('Email is already in use');
  }
  const user = await User.create({ email, name, password });
  res.status(201).json({
    name: user.name,
    email: user.email,
    token: user.createJWT(),
    isAdmin: user.isAdmin,
    _id: user._id,
  });
};

export { authUser, getUserProfile, registerUser };
