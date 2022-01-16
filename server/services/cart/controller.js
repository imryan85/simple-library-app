const User = require('../../models/User');
const { getUserByQuery } = require('../user/controller');

module.exports.addToCart = async (userId, bookId) => {
  try {
    const user = await User.findById(userId);
    
    const isDuplicate = user.cart.filter(b => b.toString() == bookId).length > 0;
    const hasTenBooks = user.cart.length === 10;

    if (isDuplicate) throw new Error('It is already in your cart.');
    if (hasTenBooks) throw new Error('You can have max 10 books in your cart.');

    
    await User.findOneAndUpdate(
      { _id: userId },
      { $push: { cart: bookId }}
    );

    return await getUserByQuery({ _id: user.id })
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
    
    return await getUserByQuery({ _id: user.id })
  } catch (err) {
    throw err;
  }
}