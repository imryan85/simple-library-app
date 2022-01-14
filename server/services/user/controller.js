const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { populate } = require('../../models/User');

const tokenSecret = "somesecret";

module.exports.signInUser = async (email, password) => {  
  try {
    const query = { email, password };
    const user = await User.findOne(query); 

    if (!user) {
      throw new Error('Cannot find username and password');
    }

    const token = jwt.sign(
      { user: email },
      tokenSecret,
      { expiresIn: '2 days' },
    );
    const authUser = user.toObject();
    delete authUser.password;

    return { token, authUser };  
  } catch (err) {
    throw err;
  }
}

module.exports.signUpUser = async (fullname, email, password) => {
  try {
    const user = await User.findOne({ email });

    if (user) throw new Error('Email already exists');

    const newUser = await new User({ 
      fullname, 
      email, 
      password 
    }).save();

    return newUser;
  } catch (err) {
    throw err;
  }
}

module.exports.getUser = async (token) => {
  try {
    const decoded = jwt.verify(token, tokenSecret);
    const email = decoded.user;
    const user = await User
      .findOne({ email })
      .populate({
        path: 'cart',
        // populate: {
        //   path: 'author',
        //   model: 'Author',
        // },
      })
      .populate({
        path: 'booksLending'
      })
      .exec();
    return user;
  } catch (err) {
    throw err;
  }
}