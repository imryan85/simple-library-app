const testDB = require('../../tests/testDB');
const User = require('../../models/User');
const Category = require('../../models/Category');
const Author = require('../../models/Author');
const Book = require('../../models/Book');
const Checkout = require('../../models/Checkout');
const BookLended = require('../../models/BookLended');
const axios = require("axios");
const {
  placeOrder,
  processOrder,
} = require('./controller');

jest.mock('axios');
axios.post.mockImplementation(() => {});

beforeAll(async () => {
  await testDB.connect();
})

afterEach(async () => {
  await testDB.clear();
})

afterAll(async () => {
  await testDB.close();
})

const setup_placeOrder = async () => {
  const category = await new Category({ category: `Some Category`}).save();
  
  const author = await new Author({ name: `Some Author`}).save();

  const book = await new Book({
    isbn: '0123456789',
    title: `test book 1`,
    category: category._id,
    author: author._id,
    authorName: author.name,
    language: "English",
    quantity: 1,
    quantityAvailable: 1,
  }).save();

  const user = await new User({
    fullname: "test user",
    email: "test@email.com",
    password: "pwd",
    cart: [ book._id ],
    lending: [],
  }).save();

  return user._id;
}

const setup_processOrder = async () => {
  const user = await new User({
    fullname: "test user",
    email: "test@email.com",
    password: "pwd",
    cart: [],
    lending: [],
  }).save();

  const book = await new Book({
    isbn: '0123456789',
    title: `test book 1`,
    category: "61e5d1eb8191d282b32dbf14",
    author: "61e5d1eb8191d282b32dbf14",
    authorName: "some author",
    language: "English",
    quantity: 1,
    quantityAvailable: 1,
  }).save();

  const checkout = await new Checkout({
    user: user._id,
    books: [ book._id ],
    isPending: true,
    dueDate: new Date(),
  }).save();

  return {
    userId: user._id,
    checkoutId: checkout._id,
    bookId: book._id,
  }
}

describe("Checking out cart item", () => {

  it("should empty cart and create a pending checkout", async () => {
    const userId = await setup_placeOrder();
    const res = await placeOrder(userId);
    const checkout = await Checkout.findOne({ user: userId});

    expect(res.cart.length == 0).toBe(true);
    expect(checkout.isPending).toBe(true);
  })

})

describe("Processing checkout items", () => {

  it("should update user.lending, book.quantityAvailable, checkout.isPending and create new a doc in booklended", async () => {
    const { userId, checkoutId, bookId } = await setup_processOrder();
    const res = await processOrder(checkoutId);

    const user = await User.findById(userId);
    const book = await Book.findById(bookId);
    const checkout = await Checkout.findById(checkoutId);
    const bookLended = await BookLended.findOne({ user: userId, book: bookId });

    expect(user.lending.length > 0).toBe(true);
    expect(book.quantityAvailable).toBe(0);
    expect(checkout.isPending).toBe(false);
    expect(bookLended).not.toBeUndefined()
  })

})