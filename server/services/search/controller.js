const Book = require('../../models/Book');
const { esSearchBooks } = require('../../esServices/esBookSearch');

module.exports.search = async (title, author, isbn) => {
  try {
    if (!title && !author && !isbn)
      throw new Error("You must enter serch keywords");

    const result = await esSearchBooks(title, author, isbn);
    const ret = result.map(b => ({
      _id: b._id,
      isbn: b._source.isbn,
      title: b._source.title,
      authorName: b._source.authorName,
      language: b._source.language,
      quantityAvailable: b._source.quantityAvailable,
      quantity: b._source.quantity,
    }));

    return ret;
  } catch (err) {
    throw err;
  }
}