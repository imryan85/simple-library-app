const mongoose = require('mongoose');
const User = require('../../models/User');

module.exports.addToCart = async (userId, bookId) => {
  try {
    const isDuplicate = await User.findOne(
      { _id: userId, cart: bookId }
    );

    if (isDuplicate) throw new Error('It is already in your cart.');

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $push: { cart: bookId }}
    );
    const data = await User.findById(user._id).populate('cart').exec();

    return { 
      userId: user._id, 
      cart: data.cart 
    };
  } catch (err) {
    throw err;
  }
}

module.exports.removeFromCart = async (userId, bookId) => {
  try {
    const doesExist = await User.findOne(
      { _id: userId, cart: bookId }
    );

    if (!doesExist) 
      throw new Error('The book you selected does not exist in your cart.');

    const user = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { cart: bookId }}
    );
    const data = await User.findById(user._id).populate('cart').exec();

    return { 
      userId: user._id, 
      cart: data.cart 
    };
  } catch (err) {
    throw err;
  }
}