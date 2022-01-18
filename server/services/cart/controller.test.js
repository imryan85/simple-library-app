const testDB = require('../../tests/testDB');
const Category = require('../../models/Category');
const Author = require('../../models/Author');
const Book = require('../../models/Book');
const User = require('../../models/User');
require('../../models/BookLended');

const {
  addToCart,
  removeFromCart,
} = require('./controller');

let userId;
let bookToAddId;
let bookToRemoveId;

beforeAll(async () => {
  await testDB.connect();

  //load test data
  const category = await new Category({ category: `Some Category`}).save();
  const author = await new Author({ name: `Some Author`}).save();
  const bookToAdd = await new Book({
    isbn: '0123456789',
    title: `Some Book Title 1`,
    category: category._id,
    author: author._id,
    authorName: author.name,
    language: "English",
    quantity: 1,
    quantityAvailable: 1,
  }).save();
  const bookToRemove = await new Book({
    isbn: '9876543210',
    title: `Some Book Title 2`,
    category: category._id,
    author: author._id,
    authorName: author.name,
    language: "English",
    quantity: 1,
    quantityAvailable: 1,
  }).save();
  const user = await new User({
    fullname: `Some Name`,
    email: `email@test.com`,
    password: `pwd`,
    cart: [ bookToRemove._id ],    
    lending: [],
  }).save();

  userId = user._id;
  bookToAddId = bookToAdd._id;
  bookToRemoveId = bookToRemove._id;
})

afterAll(async () => {
  await testDB.clear();
  await testDB.close();
  bookToAddId = undefined;
  bookToRemoveId = undefined;
})

describe("Cart", () => {

  it("added item should be returned", async () => {    
    const ret = await addToCart(userId, bookToAddId);
    expect(ret.cart.filter(c => c._id.toString() == bookToAddId).length > 0).toEqual(true);
  })

  it("removed item should not be returned", async () => {    
    const ret = await removeFromCart(userId, bookToRemoveId);
    expect(ret.cart.filter(c => c._id.toString() == bookToRemoveId).length > 0).toEqual(false);
  })

})