const app = require('../../index')
const request = require('supertest');
const testDB = require('../../tests/testDB');
const User = require('../../models/User');
const Book = require('../../models/Book');
const Category = require('../../models/Category');
const Author = require('../../models/Author');

beforeAll(async () => {
  await testDB.connect();

  //load test data
  const category = await new Category({ category: `Some Category`}).save();
  const author = await new Author({ name: `Some Author`}).save();

  const book = await new Book({
    isbn: '0123456789',
    title: `Some Book Title 1`,
    category: category._id,
    authorName: author.name,
    author: author._id,
    language: "English",
    quantity: 1,
    quantityAvailable: 1,
  }).save();

  for(let i = 1; i < 4; i++) {
    await new User({
      fullname: `name ${i}`,
      email: `email${i}@test.com`,
      password: `pwd`,
      cart: [ book._id ],
      lending: [],
    }).save();
  }
})

afterAll(async () => {
  await testDB.clear();
  await testDB.close();
})


describe('User API', () => {

  it("should return token when sign in", async () => {    
    const res = await request(app)
      .post('/user/signin')
      .set('Accept', 'application/json')
      .send({ 
        email: "email1@test.com",
        password: "pwd",
      });

    expect(res.status).toBe(200);
    expect(res._body.token).not.toBeUndefined();
  })

  it("should return 404 when user is not found", async () => {    
    const res = await request(app)
      .post('/user/signin')
      .set('Accept', 'application/json')
      .send({ 
        email: "email999@test.com",
        password: "pwd",
      });

    expect(res.status).toBe(404);
  })

});