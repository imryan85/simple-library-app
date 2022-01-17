const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema(
  {
    isbn: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'Author',
      required: true,
    },
    authorName: {
      type: String,
      required: true,
    },   
    language: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    quantityAvailable: {
      type: Number,
      required: true,
    },
    lendedTo: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        due: {
          type: Date
        },
      }
    ]
  }
);

module.exports = mongoose.model('Book', BookSchema);