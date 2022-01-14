const mongoose = require('mongoose');
const Category = require('../../models/Category');
const Book = require('../../models/Book');
const Author = require('../../models/Author');

module.exports.loadSampleData = async () => {
  let categories = [];
  let authors = [];
  let books = [];

  // create categories
  for(let i = 1; i <= 3; i++) {
    const category = await new Category({ category: `Category ${i}`}).save();
    categories.push(category.toObject());
  }

  // create authors
  for(let i = 1; i <= 3; i++) {
    const author = await new Author({ name: `Author ${i}`}).save();
    authors.push(author.toObject());
  }

  // create books
  for (let i = 1; i <= 10; i++) {
    const categoryId = categories[getRandomInt(categories.length)]._id;
    const authorId = authors[getRandomInt(authors.length)]._id;
    const quantity = getRandomInt(2) + 1;

    const book = await new Book({
      isbn: pad(i, 10),
      title: `Book Title ${i}`,
      category: categoryId,
      author: authorId,
      language: "English",
      quantity: quantity,
      quantityAvailable: quantity,
    }).save();
    books.push(book.toObject());

    // add book to categories
    await Category.findOneAndUpdate(
      { _id: categoryId }, 
      { $push: { books: book._id }
    });

    // add book to authors
    await Author.findOneAndUpdate(
      { _id: authorId }, 
      { $push: { books: book._id }
    });
  }

  return {
    categories,
    authors,
    books,
  }
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const pad = (num, size) => {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

module.exports.clearSampleData = async () => {
  const categoryDeleted = await Category.deleteMany({}).exec();
  const authorDeleted = await Author.deleteMany({}).exec();
  const bookDeleted = await Book.deleteMany({}).exec();

  return {
    categoryDeleted,
    authorDeleted,
    bookDeleted,
  }
}