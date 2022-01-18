const express = require('express');
const router = express.Router();
const jsonParser = require("body-parser").json();

const { 
  getAuthors,
  getBooksByAuthor,
} = require('./controller');

router.use(jsonParser);

router.get('/', async (req, res) => {
  try {
    const data = await getAuthors();
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.get('/:authorId/books', async (req, res) => {
  const { authorId } = req.params;
  try {
    const data =  await getBooksByAuthor(authorId);
    res.json(data);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

module.exports = router