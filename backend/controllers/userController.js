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

// @desc    Update user
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { email, password, name } = req.body;

  if (user) {
    user.email = email || user.email;
    user.name = name || user.name;
    if (password) {
      user.password = password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: updatedUser.createJWT(),
    });
  } else {
    res.status(404);
    throw new Error('User not found!');
  }
};

export { authUser, getUserProfile, registerUser, updateUserProfile };
