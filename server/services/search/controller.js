const mongoose = require('mongoose');
const Book = require('../../models/Book');

module.exports.search = async (title, author, isbn) => {
  try {
    const bookQuery = [];
    const authorQuery = [];

    if (title) {
      const titleKeywords = title.trim().split(' ');
      titleKeywords.forEach(keyword => {
        bookQuery.push({ title: { $regex: new RegExp(keyword, 'i') }});
      });  
    }

    if (isbn) {
      bookQuery.push({ isbn: isbn });
    }

    if (author) {
      const authorKeywords = author.trim().split(' ');
      authorKeywords.forEach(keyword => {
        authorQuery.push({ name: { $regex: new RegExp(keyword, 'i') }});
      });  
    }    

    const books = await Book
      .find(
        bookQuery.length > 0 ? { $and: bookQuery } : {}
      )
      .populate({
        path: 'author',
        match: authorQuery.length > 0 ? { $and: authorQuery } : {},
        select: 'name',
      })
      .populate({
        path: 'category',
        select: 'category',
      })
      .exec();    
    const result = books.filter(b => b.author !== null);

    return result;
  } catch (err) {
    throw err;
  }
}