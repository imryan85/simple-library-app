const testDB = require('../../tests/testDB');
const User = require('../../models/User');
const Book = require('../../models/Book');
const Category = require('../../models/Category');
const Author = require('../../models/Author');
require('../../models/BookLended');

const {
  signInUser,
  signUpUser,
} = require('./controller');

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

describe("Sign In", () => {

  it("should return token and authUser excluding password", async () => {    
    const res = await signInUser("email1@test.com", "pwd");
    expect(res.token).toBeDefined();
    expect(res.authUser).toBeDefined();
    expect(res.authUser.password).not.toBeDefined();
  })

  it("should fail if the same email/password does not match", async () => {
    await expect(
      signInUser("email1@test.com", "wrong_pwd")
    ).rejects.toThrow();
  })

  it("should fail if the same email/password does not exist", async () => {
    await expect(
      signInUser("email999@test.com", "wrong_pwd")
    ).rejects.toThrow();
  })
  
})

describe("Sign up", () => {

  it("should create a new user", async () => {    
    const newUser = await signUpUser("name 4", "email4@test.com", "pwd");
    //expect(newUser.token).toBeDefined();
    expect(newUser.email).toEqual("email4@test.com");
  })

  it("should fail if the same email already exist", async () => {
    await expect(
      signUpUser("name 1", "email1@test.com", "pwd")
    ).rejects.toThrow();
  })

})