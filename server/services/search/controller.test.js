const testDB = require('../../tests/testDB');
const Category = require('../../models/Category');
const Author = require('../../models/Author');
const Book = require('../../models/Book');
const {
  search,
} = require('./controller');

beforeAll(async () => {
  await testDB.connect();

  //load test data
  const category = await new Category({ category: `Some Category`}).save();
  const author = await new Author({ name: `Some Author`}).save();
  await new Book({
    isbn: '0123456789',
    title: `Some Book Title`,
    category: category._id,
    author: author._id,
    language: "English",
    quantity: 1,
    quantityAvailable: 1,
  }).save();
})

afterAll(async () => {
  await testDB.clear();
  await testDB.close();
})

describe("Search", () => {

  it("should return result if searching title is found", async () => {
    const titleSearching = 'Some Book Title'
    const res = await search(titleSearching, undefined, undefined);
    expect(res.length > 0).toBe(true);
    expect(res[0].title.includes(titleSearching)).toBe(true);
  })

  it("should return result if title keywords are found", async () => {
    const titleSearching = 'Title Book Some'
    const res = await search(titleSearching, undefined, undefined);
    expect(res.length > 0).toBe(true);
    expect(res[0].title).toBe('Some Book Title');
  })

  it("should return result if searching author is found", async () => {
    const authorSearching = 'Some Author'
    const res = await search(undefined, authorSearching, undefined);
    expect(res.length > 0).toBe(true);
    expect(res[0].author.name.includes(authorSearching)).toBe(true);
  })

  it("should return result if author keywords are found", async () => {
    const authorSearching = 'Author Some'
    const res = await search(undefined, authorSearching, undefined);
    expect(res.length > 0).toBe(true);
    expect(res[0].author.name).toBe('Some Author');
  })

  it("should return result if searching isbn is found", async () => {
    const isbnSearching = '0123456789'
    const res = await search(undefined, undefined, isbnSearching);
    expect(res.length > 0).toBe(true);
    expect(res[0].isbn).toBe(isbnSearching);
  })
  
  it("should return empty array if search keywords are not found", async () => {
    const res = await search('Wrong', 'Wrong', 'Wrong');
    expect(res.length).toBe(0);    
  })

})