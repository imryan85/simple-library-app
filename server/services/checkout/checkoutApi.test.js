const app = require('../../index')
const request = require('supertest');
const testDB = require('../../tests/testDB');
const User = require('../../models/User');
const Category = require('../../models/Category');
const Author = require('../../models/Author');
const Book = require('../../models/Book');
const Checkout = require('../../models/Checkout');
require('../../models/BookLended');

const axios = require("axios");
jest.mock('axios');

jest.mock('../email/controller');
const { queueEmail } = require('../email/controller');

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

describe('Checkout API', () => {

  it("/queue should return 200 when successful", async () => {
    const userId = await setup_placeOrder();  
    axios.post.mockImplementation(() => {});  
    const res = await request(app)
      .post('/checkout/queue')
      .set('Accept', 'application/json')
      .send({ 
        userId,
      });

    expect(res.status).toBe(200);
  })

  it("/queue should return 500 when queueing failed", async () => {
    const userId = await setup_placeOrder();  
    axios.post.mockImplementation(() => {throw new Error()});  
    const res = await request(app)
      .post('/checkout/queue')
      .set('Accept', 'application/json')
      .send({ 
        userId,
      });

    expect(res.status).toBe(500);
  })
  
  it("/process should return 200 when successful", async () => {
    const { checkoutId } = await setup_processOrder();
    queueEmail.mockImplementation(() => {});      
    const res = await request(app)
      .post('/checkout/process')
      .set('Accept', 'application/json')
      .send({ 
        checkoutId,
      });

    expect(res.status).toBe(200);
  })

});