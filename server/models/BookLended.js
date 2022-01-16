const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookLendedSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
    },  
    dueDate: {
      type: Date,
      required: true,
    },
    isOverdueNotified: {
      type: Boolean,
      required: true,
      default: false,
    },
  }, 
  { 
    timestamps: true, 
  },
);

module.exports = mongoose.model('BookLended', BookLendedSchema);