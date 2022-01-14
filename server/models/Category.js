const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    books: [
      {        
        type: Schema.Types.ObjectId,
        ref: 'Book',
      }
    ],
  }
);

module.exports = mongoose.model('Category', CategorySchema);