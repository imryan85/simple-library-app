const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cart: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Book',
      },
    ],
    lending: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BookLended',
      },
    ],
  }, 
  { 
    timestamps: true, 
  },
);

// hash the password
UserSchema.methods.generateHash = (password) => (
  bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
);

// checking if password is valid
UserSchema.methods.validPassword = (password) => (
  bcrypt.compareSync(password, this.password)
);

module.exports = mongoose.model('User', UserSchema);