const express = require('express');
const router = express.Router();
const jsonParser = require("body-parser").json();

const { 
  getOverdueBookIds,
  handleOverdueBook,
} = require('./controller');

router.use(jsonParser);

router.get('/all', async (req, res) => {
  try {
    const result = await getOverdueBookIds();
    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

router.post('/handle', async (req, res) => {
  const { bookLendedId } = req.body;
  try {
    const result = await handleOverdueBook(bookLendedId);
    res.json(result);
  } catch (err) {
    res.status(400).json({
      message: err.message
    });
  }
});

module.exports = router