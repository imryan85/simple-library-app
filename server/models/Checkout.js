const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CheckoutSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],    
    dueDate: {
      type: Date,
      // default due date is current date + 14 days
      default: () => new Date(+new Date() + 14*24*60*60*1000),
      required: true,
    },
    isPending: {
      type: Boolean,
      required: true,
      default: true,
    },
    message: [ 
      {
        type: String,
      },
    ],
  }, 
  { 
    timestamps: true, 
  },
);

module.exports = mongoose.model('Checkout', CheckoutSchema);