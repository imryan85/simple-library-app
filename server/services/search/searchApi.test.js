const app = require('../../index')
const request = require('supertest');
const testDB = require('../../tests/testDB');

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

describe('Search API', () => {

  it("should return 200 with array", async () => {    
    const res = await request(app)
      .post('/search')
      .set('Accept', 'application/json')
      .send({ 
        title: "some book",
      });

    expect(res.status).toBe(200);
    expect(Array.isArray(res._body)).toBe(true);
  })

});