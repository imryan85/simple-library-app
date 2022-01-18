const {
  search,
} = require('./controller');

jest.mock('../../esServices/esBookSearch');
const { esSearchBooks } = require('../../esServices/esBookSearch');

esSearchBooks.mockImplementation(() => [
  {
    _index: "librarydb_books",
    _id: "61e5d1eb8191d282b32dbf14",
    _source: {
      title: "some book title",
      author: "61e5d1eb8191d282b32dbf0c",
      authorName: "some author name",
      category: "61e5d1eb8191d282b32dbf0c",
      isbn: "0000000000",
      language: "English",
      quantity: 1,
      quantityAvailable: 1
    }
  }
]);

describe("Search", () => {

  it("should return result with all required properties", async () => {
    const titleSearching = 'book title'
    const res = await search(titleSearching, undefined, undefined);

    expect(res.length > 0).toBe(true);
    expect(res[0].hasOwnProperty('_id')).toBe(true);
    expect(res[0].hasOwnProperty('isbn')).toBe(true);
    expect(res[0].hasOwnProperty('title')).toBe(true);
    expect(res[0].hasOwnProperty('authorName')).toBe(true);
    expect(res[0].hasOwnProperty('language')).toBe(true);
    expect(res[0].hasOwnProperty('quantityAvailable')).toBe(true);
    expect(res[0].hasOwnProperty('quantity')).toBe(true);    
  })

})