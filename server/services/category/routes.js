const express = require('express');
const router = express.Router();
const jsonParser = require("body-parser").json();

const { 
  getCategories,
  getBooksByCategory,
} = require('./controller');

router.use(jsonParser);

router.get('/', async (req, res) => {
  try {
    const data = await getCategories();
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.get('/:categoryId/books', async (req, res) => {
  const { categoryId } = req.params;
  try {
    const data =  await getBooksByCategory(categoryId);
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

module.exports = router