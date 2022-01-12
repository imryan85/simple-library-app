const db = require('../../tests/db');
const User = require('../../models/User')
const {
  signInUser,
  signUpUser,
} = require('./controller');

beforeAll(async () => {
  await db.connect();

  //load test data
  for(let i = 1; i < 4; i++) {
    await new User({
      fullname: `name ${i}`,
      email: `email${i}@test.com`,
      password: `pwd`,
    }).save();
  }
})

afterAll(async () => {
  await db.clear();
  await db.close();
})

describe("Sign In", () => {

  it("should return token", async () => {    
    const res = await signInUser("email1@test.com", "pwd");
    expect(res.token).toBeDefined();
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