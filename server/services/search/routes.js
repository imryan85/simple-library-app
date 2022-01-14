const express = require('express');
const router = express.Router();
const jsonParser = require("body-parser").json();

const { 
  search,
} = require('./controller');

router.use(jsonParser);

router.post('/', async (req, res) => {
  const { title, author, isbn } = req.body;
  try {
    const result = await search(title, author, isbn);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

module.exports = router