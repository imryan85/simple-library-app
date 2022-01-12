const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../../models/User')

module.exports.signInUser = async (email, password) => {  
  try {
    const query = { email, password };
    console.log(query)
    const user = await User.findOne(query); 
    console.log('user', user)

    if (!user) {
      throw new Error('Cannot find username and password');
    }

    const token = jwt.sign(
      { user: email },
      "somesecret",
      { expiresIn: '2 days' },
    );

    return { token };  
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

module.exports.getUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    throw err;
  }
}