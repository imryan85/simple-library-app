const Author = require('../../models/Author');

module.exports.getAuthors = async () => {
  try {
    return await Author.find();
  } catch (err) {
    throw err;
  }
}

module.exports.getBooksByAuthor = async (authorId) => {
  try {
    const author = await Author
      .findById(authorId)
      .populate('books')
      .exec();    
    return author.books;
  } catch (err) {
    throw err;
  }
}