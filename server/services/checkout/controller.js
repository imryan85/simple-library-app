const mongoose = require('mongoose');
const axios = require("axios");
const User = require('../../models/User');
const Checkout = require('../../models/Checkout');
const Book = require('../../models/Book');
const BookLended = require('../../models/BookLended');
const { queueEmail } = require('../email/controller');
const { getUserByQuery } = require('../user/controller');

module.exports.placeOrder = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const user = await User.findById(userId).exec();

    if (user.cart.length === 0)
      throw new Error("Your cart is empty");

    // create checkout
    const checkout = await Checkout({
      user: user._id,
      books: user.cart,
    }).save();

    // empty cart
    await User.findOneAndUpdate(
      { _id: user._id },
      { 
        $set: { cart: [] },
      }
    );

    const endpoint = `${process.env.BULL_MQ_URI}/queue/checkout`;
    const msg = { checkoutId: checkout._id };
    await axios.post(endpoint, msg);

    return await getUserByQuery({ _id: user.id })
  } catch (err) {
    // rollback any changes made in the database
    await session.abortTransaction();
    throw err;
  } finally {
    // ending the session
    session.endSession();
  }
}

module.exports.processOrder = async (checkoutId) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const checkout = await Checkout
      .findById(checkoutId)
      .populate('user')
      .populate('books')
      .exec();
    const curUser = checkout.user;
    
    let failureCount = 0;
    let message = [];    

    // check book is available
    for (let i = 0; i < checkout.books.length; i++) {
      const curBook =  checkout.books[i];

      if (curBook.quantityAvailable > 0) {
        // add to bookLended
        const bookLended = await BookLended({
          user: curUser._id,
          book: curBook._id,
          dueDate: checkout.dueDate,
        }).save();

        // add bookLended id to user.lending
        // empty cart
        await User.findOneAndUpdate(
          { _id: curUser._id },
          { 
            $push: { lending: bookLended._id },
          }
        );

        // decrease availability count
        await Book.findOneAndUpdate(
          { _id: curBook._id },
          {
            $set: { 
              quantityAvailable: curBook.quantityAvailable - 1 
            },
          }
        )

        // make checkout not pending
        await Checkout.findOneAndUpdate(
          { _id: checkoutId },
          { $set: { isPending: false },
        });

        message.push(`${curBook.title} is successfully checked out.`); 
      } else {
        message.push(`${curBook.title} is no longer available.`);   
        failureCount++;     
      }
    }

    // Add status messages
    await Checkout.findOneAndUpdate(
      { _id: checkoutId },
      { $set: { message },
    });

    // commit the changes if everything was successful
    await session.commitTransaction();

    // Send email notification
    queueEmail(
      curUser.email, 
      failureCount > 0 
        ? `${failureCount} books were not checked-out`
        : 'Your checkout is completed',
      `Hi ${curUser.fullname},/r/n/r/n${message.join('/r/n')}`,
      `Hi ${curUser.fullname},<br /><br />${message.join('<br />')}`,      
    );
  } catch (err) {
    // rollback any changes made in the database
    await session.abortTransaction();
    console.error(err)
    throw err;
  } finally {
    // ending the session
    session.endSession();
  }
}