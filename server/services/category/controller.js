const Category = require('../../models/Category');

module.exports.getCategories = async () => {
  try {
    return await Category.find();
  } catch (err) {
    throw err;
  }
}

module.exports.getBooksByCategory = async (categoryId) => {
  try {
    const category = await Category
      .findById(categoryId)
      .populate('books')
      .exec();   
    return category.books; 
  } catch (err) {
    throw err;
  }
}